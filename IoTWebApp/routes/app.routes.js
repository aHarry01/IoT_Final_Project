module.exports = app => {
  const sensorDB = require("../controllers/sensor.controller.js");

  var router = require("express").Router();

  // Retrieve all Humidity Sensor Data
  router.get("/humiditysensor", sensorDB.findAllHumidity);
  // Retrieve Humidity Sensor Data by ID
  router.get("/humiditysensor/:id", sensorDB.findHumidityByID);

  // Retrieve all Light Exposure Sensor Data
  router.get("/lightsensor", sensorDB.findAllLight);
  // Retrieve Light Exposure Sensor Data by ID
  router.get("/lightsensor/:id", sensorDB.findLightByID);

  // Retrieve all Soil Moisture Sensor Data
  router.get("/moisturesensor", sensorDB.findAllMoisture);
  // Retrieve Soil Moisture Sensor Data by ID
  router.get("/moisturesensor/:id", sensorDB.findMoistureByID);

  // Retrieve all Temperature Sensor Data
  router.get("/temperaturesensor", sensorDB.findAllTemperature);
  // Retrieve Temperature Sensor Data by ID
  router.get("/temperaturesensor/:id", sensorDB.findTemperatureByID);

  app.use('/', router);
};