import React, { useEffect, useState } from 'react'
import './Deck.css'
import { toast , ToastPosition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { Deck} from './api/getDecks';
import { createCard } from './api/createCard';
import { getDeckById } from './api/getDeckById';
import { deleteCard } from './api/deleteCard';

const Decks = () => {
    const showToast = (message:string, type:string) => {
        const position : ToastPosition = 'top-right';
        if (type === 'success') {
          toast.success(message, {
            position,
            autoClose: 2000,
          });
        } else if(type==='info'){
          toast.info(message, {
            position,
            autoClose: 2000,
          });
         }else if (type === 'error') {      
          toast.error(message, {
            position,
            autoClose: 2000,
          });
        }
      };
      const [text , setText] = useState('');
      const [cards , setCards] = useState<string[]>([]);
      const [deck , setDeck] = useState<Deck>();
      const {deckId} = useParams();
     
      const handleCreateDeck=async (e:React.FormEvent)=>{
            e.preventDefault();
            if(text==""){
              showToast('Please enter a valid deck name', 'error');
              // alert("Please enter a valid Title");
              return;
            }
            const {cards: serverCards}= await createCard(deckId! , text);
            setCards(serverCards);
            setText("");  // promise 
            showToast("Card Created","success");
      }
    
      const handleDeleteCard=async(index:number)=>{
        if(!deckId) return;
        const newDeck = await deleteCard(deckId , index);
        console.log(newDeck);
         setCards(newDeck.cards);
         showToast("Deleted Card","info");
      }
    
    
    useEffect(()=>{
      const fetchCards = async () => {
        try {
            if(!deckId) return;
            const currDeck : Deck = await getDeckById(deckId);
            setDeck(currDeck);
            setCards(currDeck.cards);
        } catch (error) {
          console.error('Error fetching decks:', error);
        }
      };
    
      fetchCards();
      // console.log("We are Here");
      // return()=>{
      //   console.log("cleanUp");
      // };
    },[deckId])
    
      return (
        <div className="Deck">
        <h2>{deck?.title}</h2>
        <ul className="cards">
          {
            cards.map((card,index)=>(
              <li key={index}>
                <button onClick={()=>handleDeleteCard(index)}>❌</button>
                {/* <NavLink to={`decks/${deck._id}`}>{deck.title}</NavLink> */}
                {card}
                </li>
            ))
          }
        </ul> 
          <form onSubmit={handleCreateDeck}>
           <label htmlFor="card-text">Card Text</label>
           <input id="card-text"
           value={text}
           onChange ={(e: React.ChangeEvent<HTMLInputElement>)=>
              // TODO :  save what they typed
             {
              setText(e.target.value);
             }
          }
           />
           <button>Create Card</button>
          </form>
        </div>
      )
};

export default Decks;