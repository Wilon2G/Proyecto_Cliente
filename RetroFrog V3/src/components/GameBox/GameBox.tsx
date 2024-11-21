import { Game, GameState } from "../HomeMain";
import {PlayButton} from "./PlayButton";
import UnlockButton from "./UnlockButton";
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
      <div className="box" >
                <div className="shadow"></div>
                  <div className="box__face box__face--front " 
                    style={{
                          backgroundImage: urlgame, 
                          filter: locked ? "grayscale(80%)" : "none", 
                          border: `2px solid ${game.color}`
                          }}>
                  </div>
                <div className="box__face box__face--back " >
                    <div className="background" 
                      style={
                        game.backroute==""?{backgroundColor: game.color, 
                        filter:locked?"grayscale(85%)":""}:{backgroundImage: urlbackgame , 
                        filter:locked?"grayscale(85%)":"",
                        border: `2px solid ${game.color}`
                        }}> 

                    </div>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  {locked?<UnlockButton></UnlockButton>:<></>}
                  
                  <PlayButton setOnPlay={setGameState} id={game.id} locked={locked}  />
                  
                  
                  </div>
                  
                  
                <div className="box__face box__face--right " style={{backgroundColor: game.color , filter:locked?"grayscale(80%)":""}}><div>Game-Poy Color</div></div>
                
              </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: urlgame}} "grayscale(80%)"}   {game.backroute==""?{backgroundColor: game.color}:{backgroundImage: urlbackgame }}
