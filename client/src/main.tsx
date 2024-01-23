import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import App from './App.tsx'
import './index.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Deck from './Deck.tsx';
import Header from './Header.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'/decks/:deckId',
    element:<Deck/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer/>
    <div className='page'>
    <Header/>
    <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)

