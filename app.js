//jshintesversion:6

const { MongoClient } = require("mongodb");
const assert = require("assert");

// Replace the uri string with your connection string.
const uri =
  "mongodb://127.0.0.1:27017";
const dbName = "fruitsDB";
const client = new MongoClient(uri, {useNewUrlParser: true});

async function run() {
  try {
    const database = client.db('fruitsDB');
    // const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);
  
  } finally {


    
    // Ensures that the client will close when you finish/error
    // MongoClient.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});
    console.log("Connected successfully to server.");

    const db = client.db(dbName);

    findDocuments(db, function(){
      client.close();
    });

  }  
}

const insertDocuments =  function(db, callback){

  const collection = db.collection("fruits");
  
  collection.insertMany([
      {
      name: "Apple",
      score: 9,
      review: "lovely fruit"
  },
      {
      name: "Orange",
      score: 5,
      review: "a bit sour"
  },
      {
      name: "Banana",
      score: 7,
      review:"sweeeeet"
      }
  ], function(err, result){
  
  assert.equal(err, null);//valiates so that there are no errors
  assert.equal(3,result.insertedCount);//these later statements ensure all the three results are inserted
  assert.equal(3,Object.keys(result.insertedIds).length);console.log("Inserted 3 documents into the new collection");
  callback(result);
  }); 

  }

const findDocuments = function(db, callback){

  const collection = db.collection("fruits");

  collection.find({}).toArray(function(err, fruits){

    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);

  });

}

run().catch(console.dir);
