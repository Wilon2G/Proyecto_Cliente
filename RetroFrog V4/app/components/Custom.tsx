import { Form, useActionData } from '@remix-run/react';
import Button from './Buttons';
import ErrorMessage from './ErrorMsg';

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
  '/assets/background/bg.jpg',
  '/assets/background/bg1.jpg',
  '/assets/background/bg2.jpg',
  '/assets/background/bg3.jpg',
];

function Custom() {
  const actionData = useActionData<ActionData>();

  /*   const data = useLoaderData<themeChanges>();
  const theme = data?.theme;
  const colors = changeThemeColor(theme || 'dark');

  const { primaryBg } = colors; */

  return (
    <>
      <h2 className="text-2xl font-semibold mt-1 mb-1 text-color">Customize</h2>

      <div className="flex flex-col items-center gap-6 w-full max-w-4xl p-6 rounded-lg text-center shadow-lg bg-primary">
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
              <option value="Open sans">Open Sans</option>
              <option value="Roboto">Roboto</option>
              <option value="Comic sans">Comic sans</option>
              <option value="Arial">Arial</option>
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

export default Custom;
