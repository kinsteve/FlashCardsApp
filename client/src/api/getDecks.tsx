import { API_URL } from "./config";

export interface Deck{
    _id: string;
    title: string;
    cards:string[]
  }

export async function getDecks():Promise<Deck[]>{
    const response = await fetch(`${API_URL}/decks`);
    return response.json(); //returns a promise
}
