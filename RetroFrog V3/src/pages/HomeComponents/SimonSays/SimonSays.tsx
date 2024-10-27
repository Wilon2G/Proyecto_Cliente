export const SimonSays = () => {
  return (
    <>
      <div className="simonSays">
        
        <div className="buttons-gameboy">
        <div className="container-gameboy">
          <div id="outer-circle">
            <div id="topleft"></div>
            <div id="topright"></div>
            <div id="bottomleft"></div>
            <div id="bottomright"></div>
            <div id="inner-circle">
              <div id="title" className="font-effect-emboss">
                SIMON!
              </div>
              <div id="switches">
                <input type="checkbox" className="toggle" id="on" />
                <button className="button" id="start">
                  Start
                </button>
                <input type="checkbox" className="toggle" id="strict" />
              </div>
              <div className="text1">
                <span>POWER</span>
                <span>STRICT</span>
              </div>
              <div id="turn"></div>
              <div className="text2">COUNT</div>
            </div>
          </div>
        </div>
          <button className="up-down-directions"></button>
          <button className="right-left-directions"></button>
          <button className="button-action-1"></button>
          <button className="button-action-2"></button>
        </div>

        <script src="js/index.js"></script>
      </div>
    </>
  );
};
