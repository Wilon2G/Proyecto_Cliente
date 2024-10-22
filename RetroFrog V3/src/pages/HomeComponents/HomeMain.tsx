import GameBox from "./Game";

export type Game = {
  title: string;
  route: string;
  color: string;
  description:string;
};

const games: Game[] = [
  { title: "Mario Kart", route: "./../../media/MarioKart.jpeg", color: "#fd3d4a",description:""},
  { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)",description:"" },
];

export const HomeMain = () => {
  return (
    <>
      <div className="catalog">
        {games.map((game) => (
          <GameBox game={game} />
        ))}
      </div>
    </>
  );
};
