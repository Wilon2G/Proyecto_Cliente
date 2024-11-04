import React from 'react';

type RetroGameProps = {
  gameId: string;
};

const RetroGame: React.FC<RetroGameProps> = ({ gameId }) => {
  const gameSources: Record<string, string> = {
    "5aabf3c9-8d7d-4f6a-902a-478d8f0e3f2c": "https://www.retrogames.cc/embed/17398-super-bomberman-usa.html", 
    "3ed4a416-12c4-4a0e-98e6-48fa7b6e7d3e": "https://www.retrogames.cc/embed/23005-donkey-kong-country-usa.html", 
    "ae9f3e17-39f9-48e6-bf22-06e4b19f4b1d":"https://www.retrogames.cc/embed/44785-the-legend-of-zelda-a-link-to-the-past-title-skip-and-full-hearts.html",
    "d3f0c920-8343-4e3e-99ea-b12f4e8f6c29":"https://www.retrogames.cc/embed/23550-super-street-fighter-ii-the-new-challengers-usa.html",
    "71e4d5c1-9e7c-4fd2-9cf6-52c245d7e392":"https://www.retrogames.cc/embed/20082-f-zero-usa.html"
  };

  
  const gameUrl = gameSources[gameId] || ""; 

  return (
        <iframe
          src={gameUrl}
          width="900" height="600" 
          frameborder="yes" 
          allowfullscreen="true" 
          webkitallowfullscreen="true" 
          mozallowfullscreen="true" 
          scrolling="no">

          </iframe>
  );
};

export default RetroGame;
