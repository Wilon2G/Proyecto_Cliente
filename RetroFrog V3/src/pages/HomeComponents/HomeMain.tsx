import GameBox from "./Game";

export type Game = {
  title: string;
  route: string;
  color: string;
};

const games: Game[] = [
  { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)" },
  { title: "Super Mario", route: "./../../media/SuperMario.jpeg", color: "rgb(18, 176, 187)" },
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
