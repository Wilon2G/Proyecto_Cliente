import { Game, GameState } from "../HomeMain";
import games from "./games.json";
import React, { Suspense } from "react";

const importGame = (component: string) => {
  console.log(`./games/${component}/${component}.tsx`);
  return React.lazy(() => import(`./games/${component}/${component}.tsx`));
};

export type GameProps = {
  id: string;
  setGameState: (value: GameState) => void;
};

let juego: Game;
export default function SelectedGame({ id, setGameState }: GameProps) {
  juego = games.filter((v: Game) => v.id === id)[0];

  const Component = importGame(juego.component);

  return (
    <>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
      <button
        className="button"
        onClick={() => setGameState({ gameOn: false, id: "" })}
      >
        Salir
      </button>
    </>
  );
}
