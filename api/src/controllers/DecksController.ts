import { Request, Response} from 'express';
import DeckModel,{DeckDocument} from '../models/Deck';

class DecksController {
  static async getDecks(req: Request, res: Response) {
    try {
      const decks: DeckDocument[] = await DeckModel.find();
      console.log(decks);
      res.json(decks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createDeck(req : Request , res: Response){
    try{
        const newDeck = new DeckModel({
            title : req.body.title,
         });
         const createdDeck = await newDeck.save();
         res.json(createdDeck);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteDeck(req: Request , res : Response){
    try {
      const id:string = req.params.deckId;
      const deck = await DeckModel.findByIdAndDelete(id);
      res.json(deck);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default DecksController;

