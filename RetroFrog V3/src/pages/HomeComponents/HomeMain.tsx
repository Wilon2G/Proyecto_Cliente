import { useState } from "react";
import GameBox from "./Game";
import games from "./games.json"
import SimonGame from "./Games/SimonGame/src/SimonGame";
import usersData from "/src/pages/usersBD.json";
import RetroGame from "./Games/RetroGame";


export type Game = {
  title: string;
  route: string;
  backroute:string;
  color: string;
  description: string;
  id: string;
};



// const games: Game[] = [
//   { title: "Mario Kart", route: "./../../media/MarioKart.jpeg", color: "#fd3d4a",description:""},
//   { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)",description:"" },
// ];

export const HomeMain = () => {

  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  // console.log("onPlay:", onPlay);

  const currentUser = usersData.users[0];
  const unlockedGames = currentUser.userInfo.gamesUnlocked;
  const unlockedGamesList = games.filter((game: Game) => 
    unlockedGames.includes(game.id)
  );
  const lockedGamesList = games.filter((game: Game) => 
    !unlockedGames.includes(game.id)
  );
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game); // Actualiza el juego seleccionado
    setOnPlay(true); // Cambia el estado para iniciar el juego
  };

  if (!onPlay) {
    return (
      <>
        <div className="catalog">
          <div className="catalog__unlock">
            <h1>Tus Juegos</h1>
            {unlockedGamesList.map((game: Game) => (
              <GameBox key={game.title} game={game} setOnPlay={() => handleGameSelect(game)} />
            ))}
          </div >
          <div className="catalog__lock">
            <h1>Tienda</h1>
            {lockedGamesList.map((game: Game) => (
              <GameBox key={game.title} game={game} setOnPlay={() => handleGameSelect(game)} />
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
      <RetroGame gameId={selectedGame.id} />
    </div>
    );

    
  }

};
