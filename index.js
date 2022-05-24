//user name:rifat10
//pass : 53IHpdYbYwZahbLG
//
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rifat10:<password>@cluster0.jszmv.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://rifat10:53IHpdYbYwZahbLG@cluster0.jszmv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const itemCollection = client.db("sportSwear").collection("inventory");
        const inventory = { name: 'hjhjh', email: 'jjj@gmail.com' };
        const result = await itemCollection.insertOne(inventory);
        console.log(`User inserted with id: ${result.insertedID}`);
    }
    finally {
        //   await client.close();  
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Look Mama!')
});

app.listen(port, () => {
    console.log('listening on port', port);
})
