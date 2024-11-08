import { GameState } from "../HomeMain";

type PlayButtonProps={
    setOnPlay:(value:GameState)=>void;
    id:string;
    locked:boolean;
}

export const PlayButton=  ({setOnPlay,id,locked}:PlayButtonProps)=>{
let buttonText='¡Jugar!';
  if (locked) {
    buttonText='Demo';
  }

    return(
        <div className="playBtn">
  <button onClick={()=>{
    setOnPlay({gameOn:true,id:id});
    // console.log("Clickado");
    }}>
    {buttonText}
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
    )
}