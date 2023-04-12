# -*- coding: utf-8 -*-
"""
Created on Sat Apr 8 011:55:36 2023

@author: osullh
@tutorial: https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/

For Errors When Running in Spyder: https://stackoverflow.com/questions/22885593/importerror-no-module-named-pymongo/58961563#58961563
"""
import datetime
# Import MongoClient from PyMongo
import pymongo
from pymongo import MongoClient



# Connecting to MongoDB Cluster Rpi-Sensor-Data through User IoTwebapp
client = pymongo.MongoClient("mongodb+srv://IoTwebapp:T8hz4Xe4Z4pY5cDI@rpi-sensor-data.vmud14a.mongodb.net/?retryWrites=true&w=majority")

# Datbase 
db = client.SensorData
# Collection
collection = db.HumidityData

# Format of Data
SensorData = {
        'Data':50,
        'SensorID':'TempHumidity_1',
        'SensorName': 'Humidity Sensor',
        'TimeCollected': datetime.datetime(2023, 3, 23)
}

#Inserting Data to MongoDB
collection.insert_one(SensorData)

to_print=db.test_collection.find() # Debug
print(to_print) # Debug