# modified from: 
	# https://learn.sparkfun.com/tutorials/raspberry-pi-spi-and-i2c-tutorial/all#i2c-on-pi
	# https://github.com/mysensors/MySensorsArduinoExamples/tree/master/libraries/BH1750
	# https://www.abelectronics.co.uk/kb/article/1094/i2c-part-4---parogramming-i-c-with-python

import smbus
import time

channel = 1 # I2C channe l1 is connected to GPIO pins
address = 0x23 # I2C address of light intensity sensor
continuous_high_res_mode = 0x10 # start measuring at 1 lux res, measurement time ~120ms
one_time_high_res_mode = 0x20

bus = smbus.SMBus(channel)
time.sleep(2)

while True:
	bus.write_byte(address, one_time_high_res_mode) # trigger measurement
	time.sleep(1) # need at least 120ms to take measurement
	raw = bus.read_word_data(address,0x00) # read data
	# bytes in measurement will be swapped when read in 
	light_intensity = ((raw & 0xff00) >> 8) | ((raw & 0x00ff) << 8) 
	print(light_intensity)


