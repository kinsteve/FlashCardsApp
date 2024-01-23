import { API_URL } from "./config";
import { Deck } from "./getDecks";

export async function deleteCard(deckId:string , index:number):Promise<Deck>{
    console.log(index);
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`,{
      method:'DELETE',
      headers:{
        "Content-Type":"application/json"
      }
    })
     return response.json();
}