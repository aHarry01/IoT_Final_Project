const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectID;

// Returns all the Humidity Sensor Data
exports.findAllHumidity = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.HumidityData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.HumidityData + "` MongoDB Established!");

        // Finds data and sends it to localhost
        collection.find({}).toArray((error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns Humidity Sensor Data by ID
exports.findHumidityByID = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.HumidityData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.HumidityData + "` MongoDB Established!");

        // Find individual data point and sends it to localhost
        collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns all the Light Exposure Sensor Data
exports.findAllLight = (req, res) => {
    const client = new MongoClient(process.env.Connection_String);
    async function run() {
      try {
        // Connecting to MongoDB collection
        await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
          if(error) {
              throw error;
          }
          database = client.db(process.env.SensorData);
          collection = database.collection(process.env.LightIntensityData	);
          console.log("Connected to `" + process.env.SensorData + "." + process.env.LightIntensityData + "` MongoDB Established!");

          // Finds data and sends it to localhost
          collection.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
          });
          // Finds all entries
          //const cursor = collection.find();
          // Iterates over each entry and prints to console
          //cursor.forEach(console.log);
        });
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
}


// Returns Light Exposure Sensor Data by ID
exports.findLightByID = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.LightIntensityData	);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.LightIntensityData + "` MongoDB Established!");

        // Find individual data point and sends it to localhost
        collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns all the Soil Moisture Sensor Data
exports.findAllMoisture = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.SoilMoistureData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.SoilMoistureData + "` MongoDB Established!");

        // Finds data and sends it to localhost
        collection.find({}).toArray((error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns Soil Moisture Sensor Data by ID
exports.findMoistureByID = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.SoilMoistureData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.SoilMoistureData + "` MongoDB Established!");

        // Find individual data point and sends it to localhost
        collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns all the Temperature Sensor Data
exports.findAllTemperature = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.TemperatureData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.TemperatureData + "` MongoDB Established!");

        // Finds data and sends it to localhost
        collection.find({}).toArray((error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}


// Returns Temperature Sensor Data by ID
exports.findTemperatureByID = (req, res) => {
  const client = new MongoClient(process.env.Connection_String);
  async function run() {
    try {
      // Connecting to MongoDB collection
      await MongoClient.connect(process.env.Connection_String, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.SensorData);
        collection = database.collection(process.env.TemperatureData);
        console.log("Connected to `" + process.env.SensorData + "." + process.env.TemperatureData + "` MongoDB Established!");

        // Find individual data point and sends it to localhost
        collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
        });
        // Finds all entries
        //const cursor = collection.find();
        // Iterates over each entry and prints to console
        //cursor.forEach(console.log);
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}



