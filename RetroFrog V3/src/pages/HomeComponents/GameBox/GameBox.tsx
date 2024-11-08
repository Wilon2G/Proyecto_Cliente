import { Game, GameState } from "../HomeMain";
import {PlayButton} from "./PlayButton";
//import UnlockButton from "./UnlockButton";
type GameBoxProps={
    game:Game;
    setGameState:(value:GameState)=>void;
    locked:boolean;
}



export default function GameBox({game,setGameState,locked}:GameBoxProps) {
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
                  <PlayButton setOnPlay={setGameState} id={game.id} locked={locked} /></div>
                  {/*locked?<UnlockButton></UnlockButton>:<></>*/}
                  
                <div className="box__face box__face--right " style={{backgroundColor: game.color }}><div>Game-Poy Color</div></div>
                
              </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: urlgame}}
