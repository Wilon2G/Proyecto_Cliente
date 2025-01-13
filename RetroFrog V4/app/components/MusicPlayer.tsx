import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  style?: React.CSSProperties; 
  className?: string; 
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ style, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 

  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    { src: "/assets/music/AmazingBombermanMenuRetro.ogg", title: "Amazing Bomberman Menu Retro" },
    { src: "/assets/music/AmazingBombermanBubbleAddiction.ogg", title: "Amazing Bomberman Bubble Addiction Instrumental" },
    { src: "/assets/music/SaturnBombermanMasterMode.mp3", title: "Saturn Bomberman Master Mode Stage" },
    { src: "/assets/music/SBR2_camp.wav", title: "Super Bomberman R 2 Camp" },
    { src: "/assets/music/SBR2_camp_en.wav", title: "Super Bomberman R 2 Camp Enemy" },
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

      const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      const handleTimeUpdate = () => updateCurrentTime();
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [volume]);

  return (
    <div className={`h-fit w-72 max-w-md bg-[#151A2D] rounded-xl shadow-lg p-4 flex flex-col items-center fixed right-2 bottom-4 gap-4 transition-all z-50 ${className}`}>
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
      </svg>
      <input
        type="range"
        className="h-2 bg-gray-300 rounded-full appearance-none w-1/2"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={changeVolume}
      />
    </div>

    <div className="flex flex-col items-center transition-all w-full">
      <ul className={`playlist ${isPlaylistVisible ? "playlist-enter" : "playlist-exit"} w-full transition-all duration-500`}>
        {songs.map((song, index) => (
          <li
            key={index}
            onClick={() => changeSong(song.src)}
            className="text-sm text-white hover:bg-gray-200 hover:text-black p-2 cursor-pointer rounded-md transition duration-200"
          >
            {song.title}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center w-full gap-4 mt-4">
        <button
          onClick={togglePlaylist}
          className={`p-2 rounded-md ${isPlaylistVisible ? "bg-black" : "bg-gray-500"} hover:bg-slate-600 transition duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"/>
          </svg>
        </button>

        <div className="flex gap-4">
          <button
            onClick={playPause}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                <path d="M320-320h320v-320H320v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            )}
          </button>
          <button
            onClick={toggleRepeat}
            className={`p-2 rounded-full ${isRepeating ? "bg-green-500" : "bg-gray-500"} hover:bg-green-600 transition duration-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/>
            </svg>
          </button>
        </div>
      </div>

      <input
        type="range"
        className="w-full h-2 bg-gray-300 rounded-full appearance-none mt-4"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
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
