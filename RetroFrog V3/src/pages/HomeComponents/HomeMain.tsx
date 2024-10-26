import { useState } from "react";
import GameBox from "./Game";
import games from "./games.json"
import { SimonSays } from "./SimonSays/SimonSays";


export type Game = {
  title: string;
  route: string;
  color: string;
  description:string;
};



// const games: Game[] = [
//   { title: "Mario Kart", route: "./../../media/MarioKart.jpeg", color: "#fd3d4a",description:""},
//   { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)",description:"" },
// ];

export const HomeMain = () => {

  const [onPlay, setOnPlay]=useState<boolean>(false);

  // console.log("onPlay:", onPlay);

  if (!onPlay) {
    return (
      <>
        <div className="catalog">
          <div className="catalog__unlock">
            <h1>Tus Juegos</h1>
            {games.map((game:Game) => (
            <GameBox key={game.title} game={game} setOnPlay={setOnPlay} />
          ))}
          </div >
          <div className="catalog__lock">
            <h1>Tienda</h1>
            
          </div>
          
        </div>
        
      </>
    );
  }
  else{
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    return <SimonSays/>;
  }
  
};
