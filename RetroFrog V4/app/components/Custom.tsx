import React, { useState } from 'react';

export default function Custom() {
  const [theme, setTheme] = useState<string>('dark');
  const [background, setBackground] = useState<string>(
    '/assets/background/bg.jpg',
  );
  const [font, setFont] = useState<string>("'Open Sans', sans-serif");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleThemeChange = (theme: string) => setTheme(theme);
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFont(e.target.value);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const backgrounds = [
    '/assets/background/bg1.jpg',
    '/assets/background/bg2.jpg',
    '/assets/background/bg3.jpg',
  ];

  return (
    <div className="bg-primaryDark text-textDark flex flex-col w-full h-12">
      <h3>Customización de Página</h3>
      <div className="flex items-center gap-2">
        <label htmlFor="theme" className="text-white">
          Selecciona Tema
        </label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="hidden"
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="other">Otros</option>
        </select>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              theme === 'light' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            Claro
          </button>
          <button
            className={`px-3 py-1 rounded ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            Oscuro
          </button>
          <button
            className={`px-3 py-1 rounded ${
              theme === 'other' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => handleThemeChange('other')}
          >
            Otros
          </button>
        </div>
      </div>
      {theme === 'other' && (
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-white">Selecciona un color para el fondo</h4>
          <div className="flex gap-2">
            {backgrounds.map((bg, index) => (
              <button
                key={index}
                className="w-16 h-16 rounded-full"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                }}
                onClick={() => setBackground(bg)}
              ></button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <label htmlFor="font-family" className="text-white">
          Fuente
        </label>
        <select
          id="font-family"
          value={font}
          onChange={handleFontChange}
          className="p-2 rounded-md bg-gray-700 text-white"
        >
          <option value="'Open Sans', sans-serif">Open Sans</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Lato', sans-serif">Lato</option>
          <option value="'Arial', sans-serif">Arial</option>
        </select>
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="profile-pic" className="text-white">
          Foto de Perfil
        </label>
        <input
          type="file"
          id="profile-pic"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="border p-2 rounded-md"
        />
        {profilePic && (
          <img
            src={profilePic}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full mt-2"
          />
        )}
      </div>
    </div>
  );
}
