import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    console.error(result.error);
}

import express, { Request, Response} from 'express';
import 'colors';
import cors from 'cors';
import connectDB from './config/db';
import DecksController from './controllers/DecksController';
import CardController from './controllers/CardController';
const app = express();
app.use(express.json());
app.use(cors({
    origin:"*"                // here we add the production deployed frontend link , so that only our frontend can access this api
}));
const PORT = process.env.PORT || 5000;

app.get("/hello",(req : Request ,res : Response)=>{
    res.send("Hello World");
});

app.get('/decks',DecksController.getDecks);
app.post("/decks",DecksController.createDeck);
app.delete("/decks/:deckId" , DecksController.deleteDeck);
app.get("/decks/:deckId",DecksController.getDeckById);
app.post('/decks/:deckId/cards', CardController.createCardForDeck);
app.delete("/decks/:deckId/cards/:index", CardController.deleteCardForDeck)

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