const dotenv = require('dotenv');

// Connecting to MongoDB - Mongoose / MongoClient
MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Connection to MongoDB failed");
    }
    console.log("Connection to MongoDB Established");
    const dbSensor = client.db(process.env.SensorData);
  });