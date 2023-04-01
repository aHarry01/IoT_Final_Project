import time
import smbus
import DHT
import pigpio

# pin configurations
DHT_PIN = 18 # GPIO18, pin12

# I2C light intensity variables
I2C_CHANNEL = 1 # I2C channe l1 is connected to GPIO pins
I2C_ADDRESS = 0x23 # I2C address of light intensity sensor
CONTINUOUS_HIGH_RES_MODE = 0x10 # start measuring at 1 lux res, measurement time ~120ms
ONE_TIME_HIGH_RES_MODE = 0x20


# --- DEVICE FUNCTIONS ---
def configure_devices():
	dhtSensor = DHT.sensor(pigpio.pi(), DHT_PIN, model=DHT.DHTXX) 
	bus = smbus.SMBus(I2C_CHANNEL)
	time.sleep(0.5) 
	return dhtSensor, bus

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

# --- NETWORK FUNCTIONS ---

if __name__ == "__main__":
	dhtSensor, i2c_bus = configure_devices()
	t, h = read_temp_humidity(dhtSensor)
	lx = read_light_intensity(i2c_bus)
	print(f"Temperature:{t}\nHumidity:{h}\nLight Intensity:{lx}")

	
