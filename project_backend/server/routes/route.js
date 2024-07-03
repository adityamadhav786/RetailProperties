const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://adityamadhav786:kp4mJcQapJutF0gb@project.cnn1f.mongodb.net/?retryWrites=true&w=majority&appName=project";

const client = new MongoClient(uri);

// This section will help you get a list of all the records
router.get("/getPropertyDetails", async (req, res) => {
  
  let result = await client.connect();
  let db = result.db("MaxHome")
  let collections = db.collection("RealEstateData")
  let properties = await collections.find({}).toArray();
  res.send(properties).status(200);
  
});

router.get("/updateFavourites", async (req, res) => {

  let result = await client.connect();
  let db = result.db("MaxHome")
  let collections = db.collection("RealEstateData")
  let updated = await collections.updateOne(
    { "_id": parseInt(req.query.id)}, 
    { $set: { "isFavourite": req.query.favourite=='true' } }
  );
  res.send(updated).status(200);

});

module.exports = router