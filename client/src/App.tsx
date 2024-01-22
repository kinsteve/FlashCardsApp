import React, { useEffect, useState } from 'react'
import './App.css'
import { toast , ToastPosition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { Deck, getDecks } from './api/getDecks';
import { createDecks } from './api/createDeck';

function App() {

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
  const [title , setTitle] = useState('');
   const [decks , setDecks] = useState<Deck[]>([]);
 
  const handleCreateDeck=async (e:React.FormEvent)=>{
        e.preventDefault();
        if(title==""){
          showToast('Please enter a valid deck name', 'error');
          // alert("Please enter a valid Title");
          return;
        }
        const deck = await createDecks(title);
        setDecks([...decks , deck]);
        setTitle("");  // promise 
        showToast("Deck Created","success");
  }

  const handleDeleteDeck=async(id:string)=>{
    await deleteDeck(id);
    setDecks(decks.filter((deck)=> deck._id !==id));
    showToast("Deleted Deck","info");
  }


useEffect(()=>{
  const fetchData = async () => {
    try {
        const newDecks: Deck[] = await getDecks();
        setDecks(newDecks);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  fetchData();
  // console.log("We are Here");
  // return()=>{
  //   console.log("cleanUp");
  // };
},[])

  return (
    <div className="App">
    <ul className="decks">
      {
        decks.map((deck)=>(
          <li key={deck._id}>
            <button onClick={()=>handleDeleteDeck(deck._id)}>❌</button>
            <NavLink to={`decks/${deck._id}`}>{deck.title}</NavLink>
            </li>
        ))
      }
    </ul>
      <form onSubmit={handleCreateDeck}>
       <label htmlFor="deck-title">Deck Title</label>
       <input id="deck-title"
       value={title}
       onChange ={(e: React.ChangeEvent<HTMLInputElement>)=>
          // TODO :  save what they typed
         {
          setTitle(e.target.value);
         }
      }
       />
       <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
