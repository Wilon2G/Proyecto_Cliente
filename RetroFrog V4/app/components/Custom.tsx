import { Form, useActionData } from '@remix-run/react';
import Button from './Buttons';
import { ErrorMessage } from './ErrorMessage';

//Para los errors
export interface ActionData {
  theme?: string;
  background?: string;
  fontFamily?: string;
  errors?: {
    theme?: string;
    background?: string;
    fontFamily?: string;
  };
}

const backgrounds = [
  '/assets/background/1-bg.png',
  '/assets/background/2-bg.png',
  '/assets/background/3-bg.png',
  '/assets/background/4-bg.png',
  '/assets/background/5-bg.png',
  '/assets/background/6-bg.png',
  '/assets/background/7-bg.png',
  '/assets/background/8-bg.png',
  '/assets/background/9-bg.png',
  '/assets/background/10-bg.png',
  '/assets/background/11-bg.png',
  '/assets/background/12-bg.png',
  '/assets/background/13-bg.png',
  '/assets/background/14-bg.png',
  '/assets/background/15-bg.png',
  '/assets/background/16-bg.png',
  '/assets/background/17-bg.png',
];

// Este es el componente Custom donde seleccionas la fuente
export default function Custom() {
  const actionData = useActionData<ActionData>();

  return (
    <>
      <h2 className="text-2xl font-semibold mt-1 mb-1 text-color">Customize</h2>

      <div className="flex flex-col items-center gap-6 w-full max-w-4xl p-6 rounded-lg text-center shadow-lg bg-primary border border-primary-reverse">
        <Form method="post" className="w-full">
          {/* Tema oscuro-claro */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <label htmlFor="theme" className="text-lg font-medium">
              Select Theme
            </label>
            <div className="flex gap-4">
              <div>
                <input type="radio" name="theme" id="themeDark" value="dark" />
                <label htmlFor="themeDark" className="ml-2">
                  Dark
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="theme"
                  id="themeLight"
                  value="light"
                />
                <label htmlFor="themeLight" className="ml-2">
                  Light
                </label>
              </div>
            </div>
            <ErrorMessage>{actionData?.errors?.theme}</ErrorMessage>
          </div>

          {/* Fondo de pantalla */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium">Select Background Image</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {backgrounds.map((bg, index) => (
                <li key={index} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name="background"
                    id={`bg${index}`}
                    value={bg}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`bg${index}`}
                    className="block w-24 h-24 rounded-md overflow-hidden border-2 border-transparent peer-checked:border-blue-500"
                  >
                    <img
                      src={bg}
                      alt={`Background ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </label>
                </li>
              ))}
            </ul>
            <ErrorMessage>{actionData?.errors?.background}</ErrorMessage>
          </div>

          {/* Fuente */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="fontFamily" className="text-lg font-medium">
              Select Font
            </label>
            <select
              name="fontFamily"
              id="fontFamily"
              className="p-2 rounded-md border focus:outline-none focus:ring focus:ring-blue-300 border-color-reverse bg-primary-reverse text-color-reverse"
            >
              <option value="open-sans">Open Sans</option>
              <option value="roboto">Roboto</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="arial">Arial</option>
              <option value="press-start-2p">Press Start 2P</option>
              <option value="vt323">VT323</option>
              <option value="orbitron">Orbitron</option>
              <option value="bungee">Bungee</option>
            </select>
            <ErrorMessage>{actionData?.errors?.fontFamily}</ErrorMessage>
          </div>

          <div className="mt-6">
            <Button
              textBtn="Save Changes"
              typeBtn="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-2 rounded-md transition-all"
            />
          </div>
        </Form>
      </div>
    </>
  );
}
