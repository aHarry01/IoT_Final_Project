import time
import smbus
import spidev
import DHT
import pigpio

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


# --- DEVICE FUNCTIONS ---
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
	return ((raw[0]<<8)|raw[1])

# --- NETWORK FUNCTIONS ---

if __name__ == "__main__":
	dhtSensor, i2c_bus, spi = configure_devices()
	
	while True:
		t, h = read_temp_humidity(dhtSensor)
		lx = read_light_intensity(i2c_bus)
		soil_moisture = read_soil_moisture(spi)
		print(f"Temperature:{t}\nHumidity:{h}\nLight Intensity:{lx}\nSoil Moisture:{soil_moisture}\n")
		time.sleep(3)
