import { Request, Response } from "express";
import DeckModel from "../models/Deck";

class CardController{
    static async createCardForDeck(req:Request , res:Response){
        try {
            const deckId = req.params.deckId;
        const deck = await DeckModel.findById(deckId);
        if(!deck) return res.status(400).send("No such deck found");
        const {text} = req.body;
        deck.cards.push(text);
        await deck.save();
        res.json(deck);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
    static async deleteCardForDeck(req:Request , res:Response){
        try {
            const deckId = req.params.deckId;
            const index: string = req.params.index;
            console.log(index);
            
            const deck = await DeckModel.findById(deckId);
            if(!deck) return res.status(400).send("No such deck found");
            deck.cards.splice(parseInt(index),1);
            await deck.save();
            console.log(deck);
            res.json(deck);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



}

export default CardController;