import { useLoaderData } from '@remix-run/react';
import React, { useState, useRef, useEffect } from 'react';
import { themeChanges } from '~/root';
import { changeThemeColor } from '~/utils/themeColors';
import {
  ChooseMusicIcon,
  PlayingMusic,
  StopingMusic,
  ToggleMusic,
  VolumeIcon,
} from './IconsSVG';
import { InputRange } from './Inputs';

//DUDAS CON ESTA INTERFAZ Y PQ MUSICPLAYER ES CONST Y NO FUNCTION
interface MusicPlayerProps {
  style?: React.CSSProperties;
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    {
      src: '/assets/music/AmazingBombermanMenuRetro.ogg',
      title: 'Amazing Bomberman Menu Retro',
    },
    {
      src: '/assets/music/AmazingBombermanBubbleAddiction.ogg',
      title: 'Amazing Bomberman Bubble Addiction Instrumental',
    },
    {
      src: '/assets/music/SaturnBombermanMasterMode.mp3',
      title: 'Saturn Bomberman Master Mode Stage',
    },
    { src: '/assets/music/SBR2_camp.wav', title: 'Super Bomberman R 2 Camp' },
    {
      src: '/assets/music/SBR2_camp_en.wav',
      title: 'Super Bomberman R 2 Camp Enemy',
    },
  ];

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleRepeat = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      setIsRepeating(!isRepeating);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const changeSong = (src: string) => {
    //Para prevenir ejecutar el mismo audio
    if (audioRef.current?.src.includes(src)) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlaylist = () => {
    setIsPlaylistVisible(!isPlaylistVisible);
  };

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const handleLoadedMetadata = () =>
        setDuration(audioRef.current?.duration || 0);
      const handleTimeUpdate = () => updateCurrentTime();

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current?.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata,
        );
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [volume, audioRef]);

  //Recuperar colores
  const data = useLoaderData<themeChanges>();
  const theme = data?.theme;
  const colors = changeThemeColor(theme || 'dark');

  const {
    primaryBg,
    highlightBg,
    textColor,
    textHighlight,
    iconFill,
    iconFillHighlight,
    iconBgHighlight,
  } = colors;

  return (
    <div
      className={`h-fit w-72 max-w-md rounded-xl shadow-lg p-4 flex flex-col items-center fixed right-2 bottom-4 gap-4 transition-all z-50`}
      style={{ background: primaryBg, color: textColor }}
    >
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <VolumeIcon iconFill={iconFill} />
        <InputRange
          theme={theme}
          value={volume}
          max={1}
          onChange={changeVolume}
        />
      </div>

      <div className="flex flex-col items-center transition-all w-full">
        <ul
          className={`playlist ${
            isPlaylistVisible ? 'playlist-enter' : 'playlist-exit'
          } w-full transition-all duration-500`}
        >
          {songs.map((song, index) => (
            <li
              key={index}
              className="text-sm p-2 cursor-pointer rounded-md transition duration-200"
              style={{
                background: audioRef.current?.src.includes(song.src)
                  ? highlightBg
                  : primaryBg,
                color: audioRef.current?.src.includes(song.src)
                  ? textHighlight
                  : textColor,
              }}
              onClick={() => changeSong(song.src)}
              onKeyDown={(e) => e.key === 'Enter' && changeSong(song.src)}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              tabIndex={0}
            >
              {song.title}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center w-full gap-4 mt-4">
          <button
            onClick={togglePlaylist}
            className="p-2 rounded-md transition duration-300"
            style={{ background: iconBgHighlight }}
          >
            <ChooseMusicIcon iconFill={iconFillHighlight} />
          </button>

          <div className="flex gap-4">
            <button
              onClick={playPause}
              className="p-2 rounded-full transition duration-300"
              style={{ background: iconBgHighlight }}
            >
              {isPlaying ? (
                <StopingMusic iconFill={iconFillHighlight} />
              ) : (
                <PlayingMusic iconFill={iconFillHighlight} />
              )}
            </button>
            <button
              onClick={toggleRepeat}
              className="p-2 rounded-full transition duration-300"
              style={{ background: iconBgHighlight }}
            >
              <ToggleMusic iconFill={iconFillHighlight} />
            </button>
          </div>
        </div>

        <InputRange
          classname="mt-4"
          theme={theme}
          value={currentTime}
          max={duration}
          step={0.1}
          onChange={seek}
        />

        <audio ref={audioRef}>
          <source src={songs[0].src} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default MusicPlayer;
