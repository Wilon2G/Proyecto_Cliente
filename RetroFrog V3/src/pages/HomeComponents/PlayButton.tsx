type PlayButtonProps={
    setOnPlay:(value:boolean)=>void;
}

export const PlayButton=  ({setOnPlay}:PlayButtonProps)=>{

    return(
        <div className="playBtn">
  <button onClick={()=>{
    setOnPlay(true);
    // console.log("Clickado");
    }}>
    Jugar! 
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
    )
}