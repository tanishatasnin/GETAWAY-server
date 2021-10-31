const express = require('express');
// ____ cors ---
const cors = require ('cors');
//
const ObjectId = require('mongodb').ObjectId;

// ____ mongo client ___ 
const { MongoClient } = require('mongodb');
// ____ secuer pass ___ 
require('dotenv').config()
const app =express();
const port = process.env.PORT || 5000;
 
// ____ middleware__
app.use(cors());
app.use(express.json());

// _________ mongo uri ____ 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0k3m9.mongodb.net/myFirstDatabase?
retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run (){
               try{
        await client.connect();
        const database = client.db('travelPlace');
const servicesCollection = database.collection('places');

//  GET API 
app.get('/places', async(req,res)=>{
               const cursor = servicesCollection.find({});
               const places =await cursor.toArray();
               res.send(places);
        })
   
        
        // get single service 
app.get ('/places/:id',async(req,res)=>{
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const place = await servicesCollection.findOne(query);
        res.json(place);
})

// delete 
app.delete('/places/:id', async(req,res)=>{
        const id =req.params.id;
        const query ={_id:ObjectId(id)};
        const result =await servicesCollection.deleteOne(query);
        res.json(result);
 y
 })
 
//  Post API 
app.post('/places', async(req,res)=>{
               const place= req.body;
               console.log('hit api ',place);

               
 const result= await servicesCollection.insertOne(place);
console.log(result);
res.json(result)
               // const cursor = servicesCollection.find({});
               // const services =await cursor.toArray();
               //  res.send("services");
                })
               }

 finally{
                              
 //        await client.close();
 }       
}
 run().catch(console.dir);















app.get('/', (req,res)=>{
               res.send('running travel server');
               })
        //        _____ 
               app.get('/hello', (req,res)=>{
                res.send('running hellow');
                })
                
               app.listen(port ,()=>{
                              console.log("running genius server on porat", port)
               })