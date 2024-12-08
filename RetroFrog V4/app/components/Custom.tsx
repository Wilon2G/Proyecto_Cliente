import React, { useState } from "react";

interface CustomProps {
  style?: React.CSSProperties;
  className?: string;
}

const Custom: React.FC<CustomProps> = ({ style, className }) => {
  // Estados para personalización
  const [theme, setTheme] = useState<string>("dark");
  const [background, setBackground] = useState<string>("/assets/background/bg1.png"); // Path al fondo
  const [font, setFont] = useState<string>("'Open Sans', sans-serif");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Funciones para manejar cambios en las configuraciones
  const handleThemeChange = (theme: string) => setTheme(theme);
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBackground(e.target.value);
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

  // Lista de fondos disponibles
  const backgrounds = [
    "/assets/background/bg1.png",
    "/assets/background/bg2.png",
    "/assets/background/bg3.png",
  ];

  return (
    <div
      className={`h-3/4 w-fit max-w-md bg-[#151A2D] rounded-xl shadow-lg p-4 flex flex-col items-center fixed right-2 top-4 gap-4 transition-all ${className}`}
      style={{ ...style }}
    >
      <h3 className="text-white">Customización de Página</h3>

      {/* Selección de tema */}
      <div className="flex items-center gap-2">
      <label htmlFor="theme" className="text-white">Selecciona Tema</label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="hidden"  // Puedes hacer el select invisible si solo deseas manejar los botones
      >
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
        <option value="other">Otros</option>
      </select>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${theme === "light" ? "bg-blue-500" : "bg-gray-500"}`}
          onClick={() => handleThemeChange("light")}
        >
          Claro
        </button>
        <button
          className={`px-3 py-1 rounded ${theme === "dark" ? "bg-blue-500" : "bg-gray-500"}`}
          onClick={() => handleThemeChange("dark")}
        >
          Oscuro
        </button>
        <button
          className={`px-3 py-1 rounded ${theme === "other" ? "bg-blue-500" : "bg-gray-500"}`}
          onClick={() => handleThemeChange("other")}
        >
          Otros
        </button>
      </div>
    </div>

      {/* Opciones de color personalizado si "Otros" */}
      {theme === "other" && (
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-white">Selecciona un color para el fondo</h4>
          <div className="flex gap-2">
            {backgrounds.map((bg, index) => (
              <button
                key={index}
                className="w-16 h-16 rounded-full"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}
                onClick={() => setBackground(bg)}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* Selector de fuente */}
      <div className="flex items-center gap-2">
        <label htmlFor="font-family" className="text-white">Fuente</label>
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

      {/* Foto de perfil */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="profile-pic" className="text-white">Foto de Perfil</label>
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

      {/* Elementos internos con estilo */}
      <div
        className={`w-full h-full p-4 flex flex-col justify-center items-center transition-all rounded-md`}
        style={{
          fontFamily: font,
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          color: theme === "dark" ? "white" : "black",
        }}
      >
        <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec arcu augue. Aliquam erat volutpat. Suspendisse vitae lobortis mi. Curabitur semper suscipit lectus sed tempor. Integer vulputate dolor at sodales egestas. In bibendum, odio fringilla congue eleifend, nulla sem dictum magna, non convallis lacus ligula id magna. Phasellus velit dui, gravida eget nunc non, consectetur ultricies lacus. Duis malesuada mauris nec tellus volutpat, sit amet sollicitudin orci fringilla. Donec accumsan purus in mi finibus ornare. Aenean in condimentum lorem. Fusce consequat luctus metus id posuere. Nam vitae fringilla enim.
        </p>
      </div>
    </div>
  );
};

export default Custom;
