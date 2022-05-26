require("dotenv").config();
const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Look Mama!')
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jszmv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const itemCollection = client.db("sportSwear").collection("inventory");
        const reviewCollection = client.db("sportSwear").collection("review");

        // Loading all the inventories
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        })

        // Loading all the rivews
        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })

        // Loading a particular inventory { Load inventory:id details }
        app.get("/inventory/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await itemCollection.findOne(query);
            res.json(inventory);
        });
       
    }
    finally {
        //   await client.close();  
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log('listening on port', port);
})
