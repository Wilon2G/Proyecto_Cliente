import React, { useState } from 'react';
import Button, { ButtonAction } from './Buttons';

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
    '/assets/background/bg.jpg',
    '/assets/background/bg1.jpg',
    '/assets/background/bg2.jpg',
    '/assets/background/bg3.jpg',
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-textDark hover:text-textDarkHighlight mt-1 mb-1">
        Customize
      </h2>
      <div className="bg-primaryDark text-textDark flex flex-col items-center gap-4 w-full h-full p-5 rounded-lg text-center">
        <div className="flex items-center gap-2">
          <label htmlFor="theme">Select Theme</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="hidden"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="other">Others</option>
          </select>

          <div className="flex  gap-2">
            <ButtonAction
              textBtn="Light"
              onClick={() => handleThemeChange('light')}
              className={`${theme === 'light' ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
            <ButtonAction
              textBtn="Dark"
              onClick={() => handleThemeChange('dark')}
              className={`${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
            <ButtonAction
              textBtn="Others"
              onClick={() => handleThemeChange('other')}
              className={`${theme === 'other' ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
          </div>
        </div>
        {theme === 'other' && (
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-white">Select the image</h3>
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
            Select Font
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
            Profile Picture
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
    </>
  );
}
