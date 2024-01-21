import React, { useEffect, useState } from 'react'
import './App.css'
import { toast , ToastPosition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  interface Deck{
    _id: string;
    title: string;
  }

  const showToast = (message:string, type:string) => {
    const position : ToastPosition = 'top-right';
    if (type === 'success') {
      toast.success(message, {
        position,
        autoClose: 3000,
      });
    } else if (type === 'error') {      
      toast.error(message, {
        position,
        autoClose: 3000,
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
        await fetch('http://localhost:5000/decks',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            title,
          }),
        });
        setTitle("");  // promise 
        showToast("Deck Created","success");
  }


useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/decks');
      if (response.ok) {
        const newDecks: Deck[] = await response.json();
        setDecks(newDecks);
      } else {
        throw new Error('Error in fetch status');
      }
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
          <li key={deck._id}>{deck.title}</li>
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
