import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { z } from 'zod';

import Button from './Buttons';
import { commitSession, getSession } from '~/sessions';
import validateForm from '~/utils/validation';

//Para los errors
interface ActionData {
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

const customSchema = z.object({
  theme: z.string(),
  background: z.string(),
  fontFamily: z.string(),
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  console.log('Session data:', session.data);

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const formData = await request.formData();

  return validateForm(
    formData,
    customSchema,
    async ({ theme, background, fontFamily }) => {
      if (!theme || !background || !fontFamily) {
        return {
          errors: {
            theme: theme ? undefined : 'Theme is required.',
            background: background ? undefined : 'Background is required.',
            fontFamily: fontFamily ? undefined : 'Font family is required.',
          },
          status: 400,
        };
      }

      //Alamacenamos valores
      session.set('theme', theme);
      session.set('background', background);
      session.set('fontFamily', fontFamily);

      return redirect('/home/settings', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    },
    (errors) => ({ errors, status: 400 }),
  );
};

function Custom() {
  const actionData = useActionData<ActionData>();

  //REVISAR COMMIT PARA SESSION

  return (
    <>
      <h2 className="text-2xl font-semibold   text-textLight hover:text-textLightHighlight mt-1 mb-1">
        Customize
      </h2>

      <div className=" bg-primaryLight flex flex-col items-center gap-4 w-full h-full p-5 rounded-lg text-center">
        <Form method="post">
          {/* Tema oscuro-claro */}
          <div className="flex items-center gap-2">
            <label htmlFor="theme">Select Theme</label>
            <div className="flex gap-2">
              <input type="radio" name="theme" id="themeDark" value="dark" />
              <label htmlFor="themeDark">Dark</label>
              <input type="radio" name="theme" id="themeLight" value="light" />
              <label htmlFor="themeLight">Light</label>
            </div>

            <ErrorMessage>{actionData?.errors?.theme}</ErrorMessage>
          </div>

          {/* Fondo de pantalla */}
          <div className="flex flex-col items-center gap-2">
            <h3>Select Background Image</h3>
            <div className="flex gap-2">
              <ul>
                {backgrounds.map((bg, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      name="background"
                      id={`bg${index}`}
                      value={bg} // Cambia para enviar correctamente el valor del fondo.
                      className="w-4"
                    />
                    <label htmlFor={`bg${index}`}>
                      <img src={bg} alt={`bg ${index}`} />
                    </label>
                  </li>
                ))}
              </ul>

              <ErrorMessage>{actionData?.errors?.background}</ErrorMessage>
            </div>
          </div>

          {/* Fuente */}
          <div className="flex items-center gap-2">
            <label htmlFor="fontFamily">Select Font</label>
            <select
              name="fontFamily"
              id="fontFamily"
              className="p-2 rounded-md bg-gray-500"
            >
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Arial', sans-serif">Arial</option>
            </select>
            <ErrorMessage>{actionData?.errors?.fontFamily}</ErrorMessage>
          </div>
          <Button
            textBtn="Save Changes"
            typeBtn="submit"
            className="bg-white-600 hover:bg-indigo-700 text-lg"
          />
        </Form>
      </div>
    </>
  );
}

//VER DONDE METER ESTO
interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames('text-red-600 text-xs', className)}></p>
  ) : null;
}
export default Custom;
