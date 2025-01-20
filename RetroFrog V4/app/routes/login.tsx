import { LoaderFunction } from '@remix-run/node';
import { Form, redirect, useActionData } from '@remix-run/react';
import crypto from 'crypto'; // Si usas SHA-256 o algún algoritmo similar
import { useState } from 'react';
import Button from '~/components/Buttons';
import ErrorMessage from '~/components/ErrorMsg';
import InputForm from '~/components/InputForm';
import { checkUser, userExists } from '~/models/user.server';
import { commitSession, getSession } from '~/sessions';
import validateForm from '~/utils/validation';
import { logInSchema, registerSchema } from '../utils/zodSchemas';

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

  console.log('Form data received:', formData); // Log los datos del formulario

  if (formData.get('_action') === 'logIn') {
    console.log('ANDAS LOGUEANDOTE');
    return validateForm(
      formData,
      logInSchema,
      async (data) => {
        console.log('Login form data:', data); // Log de los datos procesados
        const userId = await checkUser(data.userNameLog, data.passwordLog);

        if (!userId) {
          console.log('User not found or incorrect credentials.');

          return {
            errors: {
              status: 400,
              generalLog: 'User or password are incorrect',
            },
          };
        } else {
          // Hashear el ID del usuario
          const hashedId = crypto
            .createHash('sha256')
            .update(userId)
            .digest('hex');
          console.log('Hashed user ID:', hashedId); // Verifica el hash

          // Guardar el hash en la sesión
          const session = await getSession(request.headers.get('cookie'));
          session.set('userId', hashedId); // Guardar el ID hasheado en la sesión
          console.log('Session after setting userId:', session);

          // Redirigir al usuario a la página de inicio
          const cookie = await commitSession(session);
          console.log('Cookie set for session:', cookie);
          return redirect('/home/main', {
            headers: {
              'Set-Cookie': cookie,
            },
          });
        }
      },
      (errors) =>
        new Response(JSON.stringify({ errors }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  } else {
    // Registro de usuario
    return validateForm(
      formData,
      registerSchema,
      async (data) => {
        console.log('Register form data:', data); // Log de los datos de registro
        const userExist = await userExists(data.userNameReg);
        if (userExist) {
          console.log('User already exists:', data.userNameReg);
          return {
            errors: {
              status: 400,
              generalReg: 'User Name is already registered, please Log In',
            },
          };
        }
        return null;
      },
      (errors) =>
        new Response(JSON.stringify({ errors }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  }
}

export default function LoginPage() {
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');
  const actionData = useActionData<typeof action>();

  return (
    <div className="h-full flex justify-end">
      <div className="h-full w-2/5 bg-primaryDark text-textDark backdrop-blur-lg">
        <div className="w-full h-1/5 p-6 flex items-center ">
          <img
            src="/assets/icon/frog-logo3.png"
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
              activePanel === 'login'
                ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                : 'flex-[1] '
            } p-8 flex flex-col justify-center items-center cursor-pointer`}
            onClick={() => setActivePanel('login')}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault(); // Evitar scroll cuando se presiona "Espacio"
                setActivePanel('register');
              }
            }}
            tabIndex={0} // Permite navegasr con Tab
            role="button" // Define el elemento como un botón para la accesibilidad
          >
            <div
              className={`transition-all duration-1000 ${
                activePanel === 'login' &&
                'translate-y-[-50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <p className="mb-4 text-gray-400 font-bold text-base ">
                Did you alreday had an account?
              </p>
              <h2
                className={`text-lg font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
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
                <InputForm
                  inputType="username"
                  textColor={'#151A2D'}
                  inputName="userNameLog"
                />
                <p>{actionData?.errors?.username}</p>
              </div>
              <div>
                <InputForm
                  inputType="password"
                  textColor={'#151A2D'}
                  inputName="passwordLog"
                />
                <p>{actionData?.errors?.password}</p>
              </div>
              <Button
                textBtn="Log In"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="logIn"
              />
              <ErrorMessage>{actionData?.errors?.generalLog}</ErrorMessage>
            </form>
          </div>

          <div
            className={`h-full flex-1 transition-all duration-500 ${
              activePanel === 'register'
                ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                : 'flex-[1] '
            }   p-8 flex flex-col justify-center items-center cursor-pointer`}
            onClick={() => setActivePanel('register')}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault(); // Evitar scroll cuando se presiona "Espacio"
                setActivePanel('login');
              }
            }}
            tabIndex={0} // Permite navegar con Tab
            role="button" // Define el elemento como un botón para la accesibilidad
          >
            <div
              className={`transition-all duration-1000 text-center ${
                activePanel === 'register' &&
                'translate-y-[-50px] opacity-0 absolute top-[-200px]'
              }`}
            >
              <p className="mb-4 text-gray-400 font-bold text-lg ">
                Don&apos;t have an account yet?
              </p>
              <h2
                className={`text-xl font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
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
              <div>
                <InputForm inputType="username" inputName="usernameReg" />
                <ErrorMessage>{actionData?.errors?.usernameReg}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="password" inputName="passwordReg" />
                <ErrorMessage>{actionData?.errors?.passwordReg}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="name" inputName="nameReg" />
                <ErrorMessage>{actionData?.errors?.nameReg}</ErrorMessage>
              </div>
              {/* <SignUpForm /> */}
              <Button
                textBtn="Sign up"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="singUp"
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
