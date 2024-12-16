import React, { useState, useEffect } from 'react';
import { ButtonAction } from './Buttons';

export default function Custom() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('color-theme') || 'light',
  );
  const [background, setBackground] = useState<string>(
    '/assets/background/bg.jpg',
  );
  const [font, setFont] = useState<string>("'Open Sans', sans-serif");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Actualizar la clase del tema y localStorage
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);
  };

  // Hacer cambio de tema claro-oscuro
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleFontChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => setFont(value);

  const handleProfilePicChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result as string);
    reader.onerror = () => console.error('Error reading file');
    reader.readAsDataURL(file);
  };

  const backgrounds = [
    '/assets/background/bg.jpg',
    '/assets/background/bg1.jpg',
    '/assets/background/bg2.jpg',
    '/assets/background/bg3.jpg',
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold dark:text-textDark dark:hover:text-textDarkHighlight text-textLight hover:text-textLightHighlight mt-1 mb-1">
        Customize
      </h2>

      <div className="dark:bg-primaryDark bg-primaryLight flex flex-col items-center gap-4 w-full h-full p-5 rounded-lg text-center">
        {/* Tema oscuro-claro */}
        <div className="flex items-center gap-2">
          <label htmlFor="theme">Select Theme</label>
          <div className="flex gap-2">
            <ButtonAction
              textBtn="Light"
              onClick={() => handleThemeChange('light')}
              className={theme === 'light' ? 'bg-blue-500' : 'bg-gray-500'}
            />
            <ButtonAction
              textBtn="Dark"
              onClick={() => handleThemeChange('dark')}
              className={theme === 'dark' ? 'bg-blue-500' : 'bg-gray-500'}
            />
            <p>{theme}</p>
          </div>
        </div>

        {/* Fondo de pantalla */}
        <div className="flex flex-col items-center gap-2">
          <h3>Select Background Image</h3>
          <div className="flex gap-2">
            {backgrounds.map((bg, index) => (
              <button
                key={index}
                aria-label={`Select background ${index + 1}`}
                className={`w-16 h-16 rounded-full border-2 ${
                  background === bg ? 'border-blue-500' : 'border-transparent'
                }`}
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                }}
                onClick={() => setBackground(bg)}
              ></button>
            ))}
          </div>
        </div>

        {/* Fuente */}
        <div className="flex items-center gap-2">
          <label htmlFor="font-family">Select Font</label>
          <select
            id="font-family"
            value={font}
            onChange={handleFontChange}
            className="p-2 rounded-md bg-gray-500"
          >
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Lato', sans-serif">Lato</option>
            <option value="'Arial', sans-serif">Arial</option>
          </select>
        </div>

        {/* Foto */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="profile-pic">Profile Picture</label>
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
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mt-2 object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}
