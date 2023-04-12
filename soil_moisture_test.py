import spidev
import time


spi_bus = 0
chip_select = 0 # using CE0 pin
spi = spidev.SpiDev()
spi.open(spi_bus, chip_select) # open connection to specific bus & device (chip select pin) 
spi.max_speed_hz = 500000
spi.mode = 0


b = spi.readbytes(2) #ADC7920 conversion is 12-bits, MSB first
result = (b[0]<<8) | b[1]
print(result)
