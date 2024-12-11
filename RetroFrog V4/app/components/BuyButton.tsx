import React, { useState } from 'react';

export default function BuyButton() {
  const [clicked, setClicked] = useState(false);  
  const [loading, setLoading] = useState(false);  
  const [purchased, setPurchased] = useState(false);  

  const handleClick = () => {
    if (clicked || purchased) return; 
    setClicked(true);  
    setLoading(true);  
    setTimeout(() => {
      setLoading(false);  
      setPurchased(true);  
    }, 2000); 
  };

  return (
    <button
      onClick={handleClick}
      className={`buy-button ${clicked ? 'clicked' : ''} ${loading ? 'loading' : ''} ${purchased ? 'purchased' : ''}`}
      disabled={clicked || purchased}  
    >
      {purchased ? 'Ya Adquirido' : loading ? 'Procesando...' : 'Comprar'}
    </button>
  );
}
