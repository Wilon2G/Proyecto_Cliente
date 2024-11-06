import { Game, GameState } from "../HomeMain";
import {PlayButton} from "./PlayButton";
type GameBoxProps={
    game:Game;
    setGameState:(value:GameState)=>void;
}



export default function GameBox({game,setGameState}:GameBoxProps) {
    const urlgame=`url(${game.route})`;
    const urlbackgame=`url(${game.backroute})`;
  return (
    <div className="game">
      <div className="scene">
      <div className="box">
                <div className="shadow"></div>
                <div className="box__face box__face--front " style={{backgroundImage: urlgame}}></div>
                <div className="box__face box__face--back " 
                  style={game.backroute==""?{backgroundColor: game.color}:{backgroundImage: urlbackgame }}>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <PlayButton setOnPlay={setGameState} id={game.id} /></div>
                <div className="box__face box__face--right " style={{backgroundColor: game.color }}><div>Game-Poy Color</div></div>
                
              </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: urlgame}}
