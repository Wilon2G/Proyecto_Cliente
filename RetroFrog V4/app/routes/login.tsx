import { Form, redirect, useActionData } from '@remix-run/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import Button from '~/components/Buttons';
import { ErrorMessage } from '~/components/ErrorMessage';
import { InputForm } from '~/components/Inputs';
import { checkUser, getThemes, userExists } from '~/models/user.server';
import { commitSession, getSession } from '~/sessions';
import validateForm from '~/utils/validation';
import { logInSchema, registerSchema } from '~/utils/zodSchemas';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  if (formData.get('_action') === 'logIn') {
    return validateForm(
      formData,
      logInSchema,
      async (data) => {
        const userId = await checkUser(data.usernameLog, data.passwordLog);
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
        const userExist = await userExists(data.usernameReg);
        if (userExist) {
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
  const actionData = useActionData<{
    errors?: {
      status: number;
      generalLog?: string;
      usernameLog?: string;
      passwordLog?: string;
      generalReg?: string;
      usernameReg?: string;
      passwordReg?: string;
      nameReg?: string;
    };
  }>();
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');

  const handlePanelChange = (panel: 'login' | 'register') => {
    if (activePanel !== panel) {
      setActivePanel(panel);
    }
  };

  return (
    <div className="h-full flex justify-end">
      <div className="h-full w-2/5 backdrop-blur-lg bg-primary">
        <div className="w-full h-1/5 p-6 flex items-center hover:bg-primary-hover">
          <img
            src="../../public/assets/icon/frog-logo3.png"
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
          >
            <form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'register' && 'opacity-0 scale-0 absolute'
              }`}
            >
              <div>
                <InputForm inputType="username" inputName="usernameLog" />
                <ErrorMessage>{actionData?.errors?.usernameLog}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="password" inputName="passwordLog" />
                <ErrorMessage>{actionData?.errors?.passwordLog}</ErrorMessage>
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
              <Button
                textBtn="Sign up"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="singUp"
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
}: SlidePannelProps) {
  //otherpanelID(Para el login es register y viceversa)
  const isActive = activePanel === panelId;

  return (
    <div
      className={classNames(
        `h-full flex-1 transition-all duration-500 ${
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
        if (event.key === ' ') {
          event.preventDefault();
          onPanelChange(otherPanelId);
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div
        className={`transition-all duration-1000 ${
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
        <h2 className="text-2xl font-bold mb-6 text-center">{activeTitle}</h2>
      </div>

      {children}
    </div>
  );
}
