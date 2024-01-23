import { API_URL } from "./config";
import { Deck } from "./getDecks";

export async function createCard(deckId:string , text:string): Promise<Deck>{
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          text,
        }),
      });
      return response.json();
}