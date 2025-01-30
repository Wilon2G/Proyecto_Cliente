import { LoaderFunction } from '@remix-run/node';
import { Form, redirect, useActionData } from '@remix-run/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import Button from '~/components/Buttons';
import { ErrorMessage } from '~/components/ErrorMessage';
import { CloseEye, OpenEye } from '~/components/IconsSVG';
import { InputForm } from '~/components/Inputs';
import {
  checkUser,
  createUser,
  getThemes,
  userExists,
} from '~/models/user.server';
import { commitSession, getSession } from '~/sessions';
import { requiredLoggedOutUser } from '~/utils/auth.server';
import validateForm from '~/utils/validation';
import { logInSchema, registerSchema } from '~/utils/zodSchemas';

export const loader: LoaderFunction = async ({ request }) => {
  await requiredLoggedOutUser(request);

  return null;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  //Esto es para el backdoor de Prueba ===========
  if (formData.get('_action') === 'prueba') {
    console.log('ADVERTENCIA:');
    console.log(
      'Se está accediendo a la página con el usuario prueba, este usuario se salta las validaciones y solo debe utilizarse durante las pruebas.',
    );
    session.set('userId', 'cm6hmu5410001lc8o6vrkrejp');
    const cookie = await commitSession(session);
    return redirect('/home/main', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  }
  //===============================================

  if (formData.get('_action') === 'logIn') {
    return validateForm(
      formData,
      logInSchema,
      async (data) => {
        const userId = await checkUser(data.emailLog, data.passwordLog);
        if (!userId) {
          return {
            errors: {
              status: 400,
              generalLog: 'User or password are incorrect',
            },
          };
        } else {
          session.set('userId', userId);

          const themeData = await getThemes(userId);
          if (themeData) {
            session.set('theme', themeData[0]);
            session.set('background', themeData[1]);
            session.set('fontFamily', themeData[2]);
          }
          const cookie = await commitSession(session);

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
    return validateForm(
      formData,
      registerSchema,
      async (data) => {
        const userExist = await userExists(data.emailReg);

        if (userExist) {
          return {
            errors: {
              status: 400,
              generalReg: 'User Name is already registered, please Log In',
            },
          };
        }

        const newUser = await createUser({
          password: data.passwordReg,
          name: data.nameReg,
          email: data.emailReg,
        });

        if (!newUser) {
          return {
            errors: {
              status: 400,
              generalReg:
                'Error in making the user, please try again later or contact the developers',
            },
          };
        }

        return {
          success: {
            status: 200,
            successReg: 'User registered correctly, please log in',
          },
        };
      },
      (errors) =>
        new Response(JSON.stringify({ errors }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  }
}

type ActionDataType = {
  errors?: {
    status: number;
    generalLog?: string;
    emailLog?: string;
    passwordLog?: string;
    generalReg?: string;
    usernameReg?: string;
    passwordReg?: string;
    nameReg?: string;
    emailReg?: string;
  };
  success?: {
    successReg?: string;
  };
};

export default function LoginPage() {
  const actionData = useActionData<ActionDataType>();
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePanelChange = (panel: 'login' | 'register') => {
    if (activePanel !== panel) {
      setActivePanel(panel);
    }
  };

  return (
    <div className="h-full relative flex justify-end">
      {/**Este form es SOLO para acceder más rápido mientras hacemos pruebas, te inicia sesión automáticamente con el usuario prueba */}
      <form className="fixed top-4 left-4" method="post">
        <Button
          textBtn="Back Door"
          typeBtn="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-lg"
          name="_action"
          value="prueba"
        />
      </form>
      {/**=====================================*/}

      <div className="h-full w-2/5 fixed right-0 backdrop-blur-lg bg-primary">
        <div className="w-full h-1/5 p-6 flex items-center hover:bg-primary-hover">
          <img
            src="/assets/icon/frog-logo3.png"
            alt="Frog Logo"
            className="w-32 h-auto mr-5"
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
          {/**LOGIN */}

          <SlidePannel
            panelId="login"
            otherPanelId="register"
            activeTitle="Welcome Back!"
            inactiveTitle="Did you already have an account?"
            buttonText="Log In!"
            activePanel={activePanel}
            onPanelChange={handlePanelChange}
            successMsg={actionData?.success?.successReg}
          >
            <form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'register' && 'opacity-0 scale-0 absolute'
              }`}
            >
              <div>
                <InputForm inputType="email" inputName="emailLog" />
                <ErrorMessage>{actionData?.errors?.emailLog}</ErrorMessage>
              </div>
              <div>
                <div className="relative">
                  <InputForm
                    inputText="Password"
                    inputType={showPassword ? 'text' : 'password'}
                    inputName="passwordLog"
                    classname="pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute right-2 top-14 transform -translate-y-1/2"
                  >
                    {showPassword ? <CloseEye /> : <OpenEye />}
                  </button>
                  <ErrorMessage>{actionData?.errors?.passwordLog}</ErrorMessage>
                </div>
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
          </SlidePannel>

          {/**REGISTER */}
          <SlidePannel
            panelId="register"
            otherPanelId="login"
            activeTitle="Welcome!"
            inactiveTitle="Don't have an account yet?"
            buttonText="Create an account!"
            activePanel={activePanel}
            onPanelChange={handlePanelChange}
          >
            <Form
              method="post"
              encType="multipart/form-data"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'login' ? 'opacity-0 scale-0 absolute' : ''
              }`}
              reloadDocument
            >
              <div>
                <InputForm inputType="email" inputName="emailReg" />
                <ErrorMessage>{actionData?.errors?.emailReg}</ErrorMessage>
              </div>

              <div>
                <InputForm inputType="password" inputName="passwordReg" />
                <ErrorMessage>{actionData?.errors?.passwordReg}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="name" inputName="nameReg" />
                <ErrorMessage>{actionData?.errors?.nameReg}</ErrorMessage>
              </div>

              <Button
                textBtn="Sign up"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="signUp"
              />
              <ErrorMessage>{actionData?.errors?.generalReg}</ErrorMessage>
            </Form>
          </SlidePannel>
        </div>
      </div>
    </div>
  );
}

type SlidePannelProps = {
  panelId: 'login' | 'register';
  otherPanelId: 'login' | 'register';
  activeTitle: string;
  inactiveTitle: string;
  buttonText: string;
  children: React.ReactNode;
  activePanel: 'login' | 'register';
  onPanelChange: (panel: 'login' | 'register') => void;
  successMsg?: string;
};

function SlidePannel({
  panelId,
  otherPanelId,
  activeTitle,
  inactiveTitle,
  buttonText,
  children,
  activePanel,
  onPanelChange,
  successMsg,
}: SlidePannelProps) {
  const isActive = activePanel === panelId;

  return (
    <div
      className={classNames(
        `h-full flex-1 transition-all duration-500  ${
          activePanel === 'register' ? `flex-[2]` : 'flex-[1]'
        }   p-8 flex flex-col justify-center items-center cursor-pointer`,
        `${
          activePanel === otherPanelId
            ? `bg-primary-hover text-color-hover`
            : ``
        }`,
      )}
      onClick={() => onPanelChange(panelId)}
      onKeyDown={(event) => {
        if (event.key === 'F2') {
          event.preventDefault();
          onPanelChange(otherPanelId);
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div
        className={`transition-all duration-1000  ${
          isActive && 'translate-y-[-50px] opacity-0 absolute top-[-200px]'
        }`}
      >
        <p className="mb-4 font-bold text-base">{inactiveTitle}</p>
        <h2 className="text-lg font-bold mb-6 p-2 text-center transition-all duration-300 rounded-xl z-50 border-2 border-color bg-primary hover:bg-primary-hover text-color hover:text-color-hover">
          {buttonText}
        </h2>
      </div>

      <div
        className={`transition-all duration-1000 ${
          !isActive && 'translate-y-[50px] opacity-0 absolute top-[-200px]'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center ">
          {activePanel === 'login' && successMsg ? successMsg : activeTitle}
        </h2>
      </div>

      {children}
    </div>
  );
}
