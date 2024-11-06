import games from "./games.json";
export type GameProps={
    id:string
}
export type Game = {
    title: string;
    route: string;
    backroute:string;
    color: string;
    description: string;
    id: string;
    url:string;
  };

let juego:Game;
export default function SelectedGame ({id}:(GameProps)) {

    juego = games.filter((v:Game)=>v.id===id)[0];

    return <>
        {juego.title}
    </>
} 