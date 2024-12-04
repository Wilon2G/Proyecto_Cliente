import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  style?: React.CSSProperties; // Accept a style prop
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    { src: "music/AmazingBombermanMenuRetro.ogg", title: "Amazing Bomberman Menu Retro" },
    { src: "music/AmazingBombermanBubbleAddiction.ogg", title: "Amazing Bomberman Bubble Addiction Instrumental" },
    { src: "music/SaturnBombermanMasterMode.mp3", title: "Saturn Bomberman Master Mode Stage" },
    { src: "music/SBR2_camp.wav", title: "Super Bomberman R 2 Camp" },
    { src: "music/SBR2_camp_en.wav", title: "Super Bomberman R 2 Camp Enemy" },
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="w-full max-w-md 
        bg-[#151A2D] 
        rounded-xl shadow-lg p-6 
        flex flex-col items-center 
        fixed right-2 bottom-4 transition-all" style={style}>
      <ul className={`playlist ${isPlaylistVisible ? "block" : "hidden"} w-full`}>
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
      <h2 className="text-xl font-semibold mb-4 text-white">Music Player</h2>
      
      <div className="flex justify-between items-center w-full mb-4">
        <button
          onClick={togglePlaylist}
          className="text-lg font-medium text-white hover: transition duration-300"
        >
          Playlist
        </button>
        <div className="flex gap-4">
          <button onClick={playPause} className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
          <button
            onClick={toggleRepeat}
            className={`p-2 rounded-full ${isRepeating ? "bg-green-500" : "bg-gray-500"} hover:bg-green-600 transition duration-300`}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
          </button>
        </div>
      </div>

      <input
        type="range"
        className="w-full h-2 bg-gray-300 rounded-full appearance-none mb-4"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={changeVolume}
      />


      <audio ref={audioRef}>
        <source src={songs[0].src} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;
