// SimonGame.tsx
import { useEffect, useState } from 'react';
import ColorCard from './components/ColorCard';
import delay from './utils/util';

function SimonGame() {
  const [isOn, setIsOn] = useState(false);

  const colorList = ["green", "red", "yellow", "blue"];

  // Define el tipo para el estado 'play'
  type PlayState = {
    isDisplay: boolean;
    colors: string[]; // Cambia a 'string[]'
    score: number;
    userPlay: boolean;
    userColors: string[]; // Cambia a 'string[]'
  };

  const initPlay: PlayState = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: []
  };

  const [play, setPlay] = useState<PlayState>(initPlay);
  const [flashColor, setFlashColor] = useState("");

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      const newColor = colorList[Math.floor(Math.random() * colorList.length)];
      const updatedColors = [...play.colors, newColor];
      setPlay((prevPlay) => ({ ...prevPlay, colors: updatedColors }));
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
    await delay(1000); // Retraso inicial antes de mostrar la secuencia

    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await delay(1000);
      setFlashColor("");
      await delay(500); // Ajuste de tiempo entre flashes

      if (i === play.colors.length - 1) {
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: [...play.colors].reverse(), // La secuencia para el usuario está invertida
        });
      }
    }
  }

  async function handleClick(color: string) {
    if (!play.isDisplay && play.userPlay) {
      const updatedUserColors = [...play.userColors];
      const lastColor = updatedUserColors.pop();
      setFlashColor(color);

      if (color === lastColor) {
        if (updatedUserColors.length) {
          setPlay((prevPlay) => ({ ...prevPlay, userColors: updatedUserColors }));
        } else {
          setPlay((prevPlay) => ({
            ...prevPlay,
            isDisplay: true,
            userPlay: false,
            score: prevPlay.colors.length,
            userColors: [],
          }));
        }
      } else {
        await delay(1000);
        setPlay({ ...initPlay, score: play.colors.length });
      }

      await delay(500);
      setFlashColor("");
    }
  }

  function handleClose() {
    setIsOn(false);
  }

  return (
    <div className='simon-game'>
        <div className='cardWrapper'>
          {colorList.map((color, i) => (
            <ColorCard
              key={i}
              color={color}
              onClick={() => handleClick(color)}
              flash={flashColor === color}
            />
          ))}
        </div>

        {isOn && !play.isDisplay && !play.userPlay && play.score > 0 && (
          <div className='lostGame'>
            <p>Final Score: {play.score}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}

        {!isOn && play.score === 0 && (
          <button onClick={startHandle} className='startButton'>Start</button>
        )}

        {isOn && (play.isDisplay || play.userPlay) && (
          <div className='score'>
            <p>Score: {play.score}</p>
          </div>
        )}
    </div>
  );
}

export default SimonGame;
