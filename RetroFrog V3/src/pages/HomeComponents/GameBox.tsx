import { Game } from "./HomeMain";
import {PlayButton} from "./PlayButton";
type GameBoxProps={
    game:Game;
    setOnPlay:(value:boolean)=>void;
}



export default function GameBox({game,setOnPlay}:GameBoxProps) {
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
                  <PlayButton setOnPlay={setOnPlay} /></div>
                <div className="box__face box__face--right " style={{backgroundColor: game.color }}><div>Game-Poy Color</div></div>
                
              </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: urlgame}}
