# Adapted from: https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/python-setup

import DHT
import pigpio
import time

dhtSensor = DHT.sensor(pigpio.pi(), 18, model=DHT.DHTXX) # 4 is BCM GPIO pin number

while True:
	timestamp, gpio, status, temperature_c, humidity = dhtSensor.read()
	temperature_f = temperature_c * (9/5) + 32
	print(f"Temp: {temperature_f}\nHumidity:{humidity}\n")
	time.sleep(2.0)

'''
import time
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT22(board.D18, use_pulseio=False) #GPIO18

while True:
	try:
		print(dhtDevice.temperature)
		time.sleep(2.0)
	except Exception as e:
		print(e)


while True:
	try:
		temp_celsius = dhtDevice.temperature
		temp_fahrenheit = temp_celsius * (9/5) + 32
		humidity = dhtDevice.humidity
		print(f"Temperature (F): {temp_fahrenheit}\nHumidity:{humidity}\n\n")
	except RuntimeError as error:
		print(error.args[0])
		time.sleep(1.0)
		continue
	except Exception as error:
		dhtDevice.exit()
		raise error
	time.sleep(2)
'''
