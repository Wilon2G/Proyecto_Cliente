import { useState } from "react";
import GameBox from "./GameBox/GameBox";
import games from "./GameBox/games.json";
import usersData from "/src/pages/usersBD.json";
import SelectedGame from "./GameBox/SelectedGame.tsx";

export type Game = {
  title: string;
  route: string;
  backroute:string;
  color: string;
  description: string;
  id: string;
  component:string;
};
export type GameState ={
  gameOn: boolean;
  id: string;
}




// const games: Game[] = [
//   { title: "Mario Kart", route: "./../../media/MarioKart.jpeg", color: "#fd3d4a",description:""},
//   { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)",description:"" },
// ];

export const HomeMain = () => {

  const [gameState, setGameState] = useState<GameState>({gameOn:false,id:""});
  //const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  // console.log("onPlay:", onPlay);

  const currentUser = usersData.users[0];
  const unlockedGames = currentUser.userInfo.gamesUnlocked;
  const unlockedGamesList = games.filter((game: Game) => 
    unlockedGames.includes(game.id)
  );
  const lockedGamesList = games.filter((game: Game) => 
    !unlockedGames.includes(game.id)
  );
  
  if (!gameState.gameOn) {
    return (
      <>
        <div className="catalog">
          <div className="catalog__unlock">
            <h1>Tus Juegos</h1>
            {unlockedGamesList.map((game: Game) => (
              <GameBox key={game.title} game={game} setGameState={setGameState} />
            ))}
          </div >
          <div className="catalog__lock">
            <h1>Tienda</h1>
            {lockedGamesList.map((game: Game) => (
              <GameBox key={game.title} game={game} setGameState={setGameState} />
            ))}
          </div>

        </div>

      </>
    );
  }
  else {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    return (
      <div className="GameContainer">
        <SelectedGame id={gameState.id} setGameState={setGameState}/>

{/*         
        {selectedGame?.title === "Simon Game" ? (
          <SimonGame />
        )  : (
          <iframe
            src={selectedGame?.url}
            allowFullScreen
          />
        )}
        <button className="button" onClick={() => setGameState}>
          Salir
        </button> */}
      </div>
    );
  }
};
