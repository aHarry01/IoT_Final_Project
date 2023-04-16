import time
import smbus
import spidev
import DHT
import pigpio
import RPi.GPIO as GPIO
import signal
import websocket
import threading
import rel
import datetime
import pymongo
from pymongo import MongoClient

# url of WebSocket server
url = "ws://192.168.0.13:3000"

# Pin number to control water pump
WATER_PIN = 21 # GPIO21 (BCM)
GPIO.setmode(GPIO.BCM)
GPIO.setup(WATER_PIN, GPIO.OUT)

# pin configurations
DHT_PIN = 18 # GPIO18, pin12

# I2C light intensity variables
I2C_CHANNEL = 1 # I2C channel1 is connected to GPIO pins
I2C_ADDRESS = 0x23 # I2C address of light intensity sensor
CONTINUOUS_HIGH_RES_MODE = 0x10 # start measuring at 1 lux res, measurement time ~120ms
ONE_TIME_HIGH_RES_MODE = 0x20

# SPI soil moisture variables
spi_bus = 0
spi_chip_select = 0

# Database client
client = pymongo.MongoClient("mongodb+srv://IoTwebapp:T8hz4Xe4Z4pY5cDI@rpi-sensor-data.vmud14a.mongodb.net/?retryWrites=true&w=majority")
# Database 
db = client.SensorData
# Collections
collectionHumidity = db.HumidityData
collectionLightIntensity = db.LightIntensityData
collectionTemperature = db.TemperatureData
collectionSoil = db.SoilMoistureData

plantStatus = 'OK'

# --- Configurations ---
# These configuration options can be updated by the server via a WebSocket

# Configurable optimal levels for temperature/humidity/soil moisture/light exposure time
# will send alerts to server if plant measurements leave these bounds
optimalLevels = {'tempLower': 60, 'tempUpper': 85, 
		'humidityLower': 30, 'humidityUpper': 95,
		'soilMoistureSetpoint': 50,
		'sunlightTime': 4.5,
		'wateringTime': 1}
# Watering mode
# manual = only water when user gives the command
# time = water every 'wateringTime' hours
# soil_moisture = attempt to keep the soil moisture hovering around the setpoint on average
wateringMode = "manual"

# have to call GPIO cleanup when program is terminated
# with CTRL+C to properly clean up GPIO for the next time the program is run
def cleanup(signum, frame):
    GPIO.cleanup()
signal.signal(signal.SIGINT, cleanup)

# --- DEVICE FUNCTIONS ---
# Functions for interfacing with devices wired to the RPi
def configure_devices():
	dhtSensor = DHT.sensor(pigpio.pi(), DHT_PIN, model=DHT.DHTXX) 
	bus = smbus.SMBus(I2C_CHANNEL)
	spi = spidev.SpiDev()
	spi.open(spi_bus,  spi_chip_select)
	spi.mode = 0
	spi.max_speed_hz = 500000
	time.sleep(0.5) 
	return dhtSensor, bus, spi

def read_temp_humidity(sensor):
	timestamp, gpio, status, temperature_c, humidity = sensor.read()
	temperature_f = temperature_c * (9/5) + 32
	return temperature_f, humidity
	
def read_light_intensity(i2c_bus):
	i2c_bus.write_byte(I2C_ADDRESS, ONE_TIME_HIGH_RES_MODE) # trigger measurement
	time.sleep(1) # need at least 120ms to take measurement
	raw = i2c_bus.read_word_data(I2C_ADDRESS,0x00) # read data
	# bytes in measurement will be swapped when read in 
	light_intensity = ((raw & 0xff00) >> 8) | ((raw & 0x00ff) << 8)
	return light_intensity

def read_soil_moisture(spi):
	raw = spi.readbytes(2)
	raw = (raw[0]<<8)|raw[1]
	# in practice, saturated soil reads 1200-1400 and dry soil reads 2700-2900
	# so use 1200 as upper soil moisture & 2900 as lower soil moisture
	return 100 - 100*float(raw-1200)/(2900-1200)

def run_water_pump(seconds):
	GPIO.output(WATER_PIN, GPIO.HIGH)
	time.sleep(seconds)
	GPIO.output(WATER_PIN, GPIO.LOW)

# --- NETWORK FUNCTIONS ---
# Functions to communicate with the WebSocket server & MongoDB server

# WebSocket functions
def on_message(ws, message):
	msg_parts = message.split(':')    
	if msg_parts[0] == "waterPlant":
		run_water_pump(2)
		print("trigger plant watering!")
	elif msg_parts[0] == 'wateringMethodChange':
		global wateringMode
		wateringMode = msg_parts[1]
		print(f"Change watering method to {msg_parts[1]}")
		
	elif msg_parts[0] == 'alertLevelsChange':
		print(f"Change alert levels")
		global optimalLevels
		optimalLevels['tempLower'] = int(msg_parts[1].split('_')[0])
		optimalLevels['tempUpper'] = int(msg_parts[1].split('_')[1])
		optimalLevels['humidityLower'] = int(msg_parts[2].split('_')[0])
		optimalLevels['humidityUpper'] = int(msg_parts[2].split('_')[1])
		optimalLevels['soilMoistureSetpoint'] = int(msg_parts[3])
		optimalLevels['sunlightTime'] = int(msg_parts[4])
		optimalLevels['wateringTime'] = int(msg_parts[5])

		print(optimalLevels)
		
	ws.send('Message receipt acknowledged')
	
def on_error(ws, error):
	print(error)
	
def on_close(ws, close_status_code, close_msg):
	print("Connection closed")
	
def on_open(ws):
	print("Opened connection")

def connect_websocket():
	# Start WebSocket connection
	websocket.enableTrace(True)
	ws = websocket.WebSocketApp(url,
							on_open=on_open, 
							on_message=on_message,
							on_error=on_error,
							on_close=on_close)
	# Open the WebSocket server in a separate thread
	# so the Pi can continue to collect sensor data
	wst = threading.Thread(target=ws.run_forever)
	wst.daemon = True
	wst.start()

	return ws


# Upload data to MongoDB server
def upload_data(humidity, temp, lx, soil):
    # Format of Data
    SensorData = {
            'Data':humidity,
            'SensorID':'TempHumidity_1',
            'SensorName': 'Humidity Sensor',
            'TimeCollected': datetime.datetime.now()
    }
    collectionHumidity.insert_one(SensorData)
    
    # Format of Data
    SensorData = {
            'Data':humidity,
            'SensorID':'TempHumidity_1',
            'SensorName': 'Temperature Sensor',
            'TimeCollected': datetime.datetime.now()
    }
    collectionTemperature.insert_one(SensorData)
    
    # Format of Data
    SensorData = {
            'Data':lx,
            'SensorID':'LightIntensity_1',
            'SensorName': 'Light Intensity Sensor',
            'TimeCollected': datetime.datetime.now()
    }
    collectionLightIntensity.insert_one(SensorData)
    
    # Format of Data
    SensorData = {
            'Data':soil,
            'SensorID':'SoilMoisture_1',
            'SensorName': 'Soil Moisture Sensor',
            'TimeCollected': datetime.datetime.now()
    }
    collectionSoil.insert_one(SensorData)


if __name__ == "__main__":
	dhtSensor, i2c_bus, spi = configure_devices()

	# Note that with this current setup the server must
	# be started before running this script
	try:
		ws = connect_websocket()
	except Exception as e:
		print("WebSocket failed to connect")
		print(e)

	wateringPause = False
	lastWatered = None
	while True:
		now = time.time()
		# gather data from various sensors
		t, h = read_temp_humidity(dhtSensor)
		lx = read_light_intensity(i2c_bus)
		soil_moisture = read_soil_moisture(spi)
		# upload data to MongoDB database
		upload_data(h,t,lx,soil_moisture)

		newPlantStatus = []
		if t > optimalLevels['tempUpper']:
			newPlantStatus.append('TEMP_HIGH')
		elif t < optimalLevels['tempLower']:
			newPlantStatus.append('TEMP_LOW')
                    
		if h > optimalLevels['humidityUpper']:
			newPlantStatus.append('HUMIDTY_HIGH')
		elif h < optimalLevels['humidityLower']:
			newPlantStatus.append('HUMIDITY_LOW')

		if len(newPlantStatus) == 0:
			newPlantStatus = "OK"
		else:
			newPlantStatus = ','.join(newPlantStatus)

		# Update plant status to server if measurements fall outside optimal levels
		if newPlantStatus != plantStatus:
			ws.send(f'plantStatus:{newPlantStatus}')
		plantStatus = newPlantStatus

                # water based on soil moisture
                # if we just watered, wait 2 minutes before concluding it wasn't enough
                # and watering again
		if wateringMode == "soil_moisture" and (lastWatered == None or now-lastWatered > 120):
			# don't water until we're ~10% below where we should be
			if soil_moisture < 0.9*optimalLevels['soilMoistureSetpoint']:
				run_water_pump(3)
				lastWatered = time.time()

    
		print(f"Temperature:{t}\nHumidity:{h}\nLight Intensity:{lx}\nSoil Moisture:{soil_moisture}\n")
		time.sleep(3)
	GPIO.cleanup()
