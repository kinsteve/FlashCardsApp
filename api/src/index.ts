import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    console.error(result.error);
}

import express, { Request, Response } from 'express';
import DeckModel from './models/Deck';

import 'colors';
import connectDB from './config/db';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/hello",(req : Request ,res : Response)=>{
    res.send("Hello World");
});

app.post("/decks",async (req : Request ,res : Response)=>{

    const newDeck = new DeckModel({
       title : req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});


const url : string | undefined  = process.env.MONGO_URI;

if (!url) {
    console.error('Error: MONGO_URI environment variable is not set');
    process.exit(1);
  }

const start= async ()=>{
    try {
        await connectDB(url)
        app.listen(PORT,()=>{
            console.log(`Server started on port ${PORT}`.yellow.bold);
            console.log("MongoDB Connected".green.bold);
        })
    } catch (error:any) {
        console.log(`Error:${(error as Error).message}`.red.bold);
    }
}

start();