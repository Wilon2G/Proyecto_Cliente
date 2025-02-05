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
const bgdir = '/assets/background/';
const backgrounds = [
  '1-bg',
  '2-bg',
  '3-bg',
  '4-bg',
  '5-bg',
  '6-bg',
  '7-bg',
  '8-bg',
  '9-bg',
  '10-bg',
  '11-bg',
  '12-bg',
  '13-bg',
  '14-bg',
  '15-bg',
  '16-bg',
];
const ext = '.avif';

export default function Custom() {
  const actionData = useActionData<ActionData>();

  return (
    <>
      <h2 className="text-2xl font-semibold mt-1 mb-1 text-color">
        Personalization
      </h2>

      <div className="flex flex-col items-center gap-6 w-full p-6 rounded-lg text-center shadow-lg bg-primary border border-primary-reverse">
        <Form method="post" className="w-full" reloadDocument>
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
                    value={bgdir + bg + ext}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`bg${index}`}
                    className="block w-24 h-24 rounded-md overflow-hidden border-2 border-transparent peer-checked:border-blue-500"
                  >
                    <img
                      src={bgdir + bg + '-sm' + ext}
                      alt={`Background ${index}`}
                      className="w-20 h-20 sm:w-28 sm:h-28 object-cover"
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
              <option value="arial">Arial</option>
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
              className="bg-indigo-500 hover:bg-indigo-700 text-white text-lg px-6 py-2 rounded-md transition-all"
            />
          </div>
        </Form>
      </div>
    </>
  );
}
