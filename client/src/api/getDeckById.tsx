import { API_URL } from "./config";

export interface Deck{
    _id: string;
    title: string;
    cards:string[]
  }

export async function getDeckById(deckId : string):Promise<Deck>{
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json(); //returns a promise
}
