import { Game } from "./HomeMain";

type GameBoxProps={
    game:Game;
}



export default function GameBox({game}:GameBoxProps) {
    const urlgame=`url(${game.route})`;
  return (
    <div className="game">
      <div className="scene">
      <div className="box">
                <div className="shadow"></div>
                <div className="box__face box__face--front " style={{backgroundImage: urlgame}}></div>
                <div className="box__face box__face--back " style={{backgroundColor: game.color }}>{game.title}</div>
                <div className="box__face box__face--right " style={{backgroundColor: game.color }}>right</div>
                
              </div>
      </div>
    </div>
  );
}

// style={{backgroundImage: urlgame}}