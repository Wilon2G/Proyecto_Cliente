import { Form, redirect, useActionData, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import { logInSchema } from '../utils/zodSchemas';
import validateForm from '~/utils/validation';
import Button from '~/components/Buttons';
import InputForm from '~/components/InputForm';
import { getSession } from '~/sessions';
import { LoaderFunction } from '@remix-run/node';
import { themeChanges } from '~/root';
import { changeThemeColor } from '~/utils/themeColors';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  // Devolver los valores existentes en la sesión.
  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/bg3.jpg',
    fontFamily: session.get('fontFamily') || 'arial',
  };
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  return validateForm(
    formData,
    logInSchema,
    (data) => {
      return redirect('/home');
    },
    (errors) =>
      new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
  );
}

export default function LoginPage() {
  const data = useLoaderData<themeChanges>();

  const theme = data?.theme;
  const colors = changeThemeColor(theme || 'dark');

  const { primaryBg, highlightBg, textColor, textHighlight } = colors;

  const [isHovered, setIsHovered] = useState(false);

  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');
  const actionData = useActionData<typeof action>();

  return (
    <div className="h-full flex justify-end">
      <div
        className="h-full w-2/5  backdrop-blur-lg"
        style={{ background: `${primaryBg}` }} // Aplicación de color dinámico
      >
        <div
          className="w-full h-1/5 p-6 flex items-center "
          style={{ background: `${highlightBg}` }}
        >
          <img
            src="../../public/assets/icon/frog-logo3.png"
            alt=""
            className="w-32 h-auto"
          />
          <div className="w-full">
            <h1 className="text-6xl">Retrofrog</h1>
            <h3 className="text-xl">
              Welcome to the first online arcade experience
            </h3>
            <p>
              Login to discover our full catalog or Signup if you don&apos;t
              have an account
            </p>
          </div>
        </div>

        <div className="flex w-full h-4/5">
          <div
            className={`flex-1 transition-all duration-500 ${
              activePanel === 'login' ? `flex-[2]` : 'flex-[1]'
            } p-8 flex flex-col justify-center items-center cursor-pointer`}
            style={{
              background: activePanel === 'login' ? highlightBg : '', // Aplicación de color dinámico
              color: activePanel === 'login' ? textHighlight : '', // Aplicación de color dinámico
            }}
            onClick={() => setActivePanel('login')}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault();
                setActivePanel('register');
              }
            }}
            tabIndex={0}
            role="button"
          >
            <div
              className={`transition-all duration-1000 ${
                activePanel === 'login' &&
                'translate-y-[-50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <p className="mb-4 font-bold text-base ">
                Did you alreday had an account?
              </p>
              <h2
                className="text-lg font-bold mb-6 p-2 text-center transition-all duration-300 rounded-xl z-50 border-2"
                style={{
                  borderColor: `${textColor}`,
                  background: isHovered ? `${highlightBg}` : `${primaryBg}`,
                  color: isHovered ? `${textHighlight}` : `${textColor}`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Log In!
              </h2>
            </div>

            <div
              className={`transition-all duration-1000 ${
                activePanel !== 'login' &&
                'translate-y-[50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <h2 className={`text-2xl font-bold mb-6 text-center`}>
                Welcome Back!
              </h2>
            </div>

            <form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'register' && 'opacity-0 scale-0 absolute'
              }`}
            >
              <div>
                <InputForm inputType="userName" textColor={'#151A2D'} />
                <p>{actionData?.errors?.userName}</p>
              </div>
              <div>
                <InputForm inputType="password" textColor={'#151A2D'} />
                <p>{actionData?.errors?.password}</p>
              </div>
              <Button
                textBtn="Log In"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
              />
            </form>
          </div>

          <div
            className={`h-full flex-1 transition-all duration-500 ${
              activePanel === 'register' ? `flex-[2]` : 'flex-[1]'
            }   p-8 flex flex-col justify-center items-center cursor-pointer`}
            style={{
              background: activePanel === 'register' ? highlightBg : '', // Aplicación de color dinámico
              color: activePanel === 'register' ? textHighlight : '', // Aplicación de color dinámico
            }}
            onClick={() => setActivePanel('register')}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault();
                setActivePanel('login');
              }
            }}
            tabIndex={0}
            role="button"
          >
            <div
              className={`transition-all duration-1000 text-center ${
                activePanel === 'register' &&
                'translate-y-[-50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <p className="mb-4 font-bold text-lg ">
                Don&apos;t have an account yet?
              </p>
              <h2
                className="text-lg font-bold mb-6 p-2 text-center transition-all duration-300 rounded-xl z-50 border-2"
                style={{
                  borderColor: `${textColor}`,
                  background: isHovered ? `${highlightBg}` : `${primaryBg}`,
                  color: isHovered ? `${textHighlight}` : `${textColor}`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Create an account!
              </h2>
            </div>

            <div
              className={`transition-all duration-1000 ${
                activePanel !== 'register' &&
                'translate-y-[50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <h2 className={`text-2xl font-bold mb-6 text-center`}>
                Welcome!
              </h2>
            </div>
            <Form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'login' ? 'opacity-0 scale-0 absolute' : ''
              }`}
            >
              <SignUpForm />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
