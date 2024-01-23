import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='Header'>
         <div>
          <a href="/">FLASHCARDSAGE</a>
        </div>
        <div>
        <a href="/">Decks</a>
        </div>         
        <div>
        <a href="/login">Login</a>
        </div>         
    </div>
    );
};

export default Header;