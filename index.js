import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import itemRoutes from './routes/itemRoutes.js'

import dotenv from 'dotenv';

dotenv.config();

const MongoURI = process.env.MONGOURI
// console.log(MongoURI);
const port = 5000 || process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api',itemRoutes)
app.use('/',(req,res)=>{
    res.json("no ji nah")
})


mongoose.connect(MongoURI, ()=>{
    console.log("Connected to database sucessfully")
})


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})




