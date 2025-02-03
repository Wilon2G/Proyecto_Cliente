import { useState } from 'react';
import GameBox from '../GameBox/GameBox';
import games from '../../data/games.json';
import SelectedGame from '../GameBox/SelectedGame.tsx';

export type Game = {
  title: string;
  route: string;
  backroute: string;
  color: string;
  description: string;
  id: string;
  component: string;
};
export type GameState = {
  gameOn: boolean;
  id: string;
};

// const games: Game[] = [
//   { title: "Mario Kart", route: "./../../media/MarioKart.jpeg", color: "#fd3d4a",description:""},
//   { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)",description:"" },
// ];

export const HomeMain = () => {
  const [gameState, setGameState] = useState<GameState>({
    gameOn: false,
    id: '',
  });
  //const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  // console.log("onPlay:", onPlay);

  const unlockedGames = sessionStorage.getItem('unlockedGames');
  const unlockedGamesList = games.filter((game: Game) =>
    unlockedGames?.includes(game.id),
  );
  const lockedGamesList = games.filter(
    (game: Game) => !unlockedGames?.includes(game.id),
  );

  if (!gameState.gameOn) {
    //const [lockedgame,setLocked]=useState<boolean[]>([]);  Idea de usar estados para definir juegos como bloqueados

    return (
      <>
        <div className="catalog">
          <div className="catalog__unlock">
            <h1 id="titleGames">Tus Juegos</h1>
            <div className="games">
              {unlockedGamesList.map((game: Game) => (
                <GameBox
                  key={game.title}
                  game={game}
                  setGameState={setGameState}
                  locked={false}
                />
              ))}
            </div>
          </div>
          <div className="catalog__lock">
            <h1 id="titleStore">Tienda</h1>
            <div className="games">
              {lockedGamesList.map((game: Game) => (
                <GameBox
                  key={game.title}
                  game={game}
                  setGameState={setGameState}
                  locked={true}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    return (
      <div className="GameContainer">
        <SelectedGame id={gameState.id} setGameState={setGameState} />
      </div>
    );
  }
};
