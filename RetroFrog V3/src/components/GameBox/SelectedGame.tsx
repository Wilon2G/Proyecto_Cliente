import { Game, GameState } from "../HomeBox/HomeMain";
import games from "../../data/games.json";
import React, { Suspense } from "react";

export type GameProps = {
  id: string;
  setGameState: (value: GameState) => void;
};
const importGame = (component: string) => {
  console.log(`./games/${component}/${component}.tsx`);
  return React.lazy(() => import(`./games/${component}/${component}.tsx`));
};

export default function SelectedGame({ id, setGameState }: GameProps) {
  let juego: Game;
  juego = games.filter((v: Game) => v.id === id)[0];

  const Component = importGame(juego.component);
  sessionStorage.setItem('gameId', id);


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
      <button
        className="button__exit"
        onClick={() => {setGameState({ gameOn: false, id: "" }); sessionStorage.removeItem('gameId')}}
      >
        Salir
      </button>
    </>
  );
}
