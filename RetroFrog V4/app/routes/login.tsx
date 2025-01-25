import { Form, redirect, useActionData } from '@remix-run/react';
import classNames from 'classnames';
import fs from 'fs';
import React, { useState } from 'react';
import Button from '~/components/Buttons';
import { ErrorMessage } from '~/components/ErrorMessage';
import { InputForm } from '~/components/Inputs';
import db from '~/db.server';
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
        const userId = await checkUser(data.username, data.password);
        if (!userId) {
          return {
            errors: {
              status: 400,
              general: 'User or password are incorrect',
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
        const userExist = await userExists(data.username);
        if (userExist) {
          return {
            errors: {
              status: 400,
              generalReg: 'User Name is already registered, please Log In',
            },
          };
        }

        const file = formData.get('pfpReg');
        if (!(file instanceof File)) {
          return {
            errors: {
              status: 400,
              pfpReg: 'The uploaded file is not valid',
            },
          };
        }

        if (typeof window === 'undefined') {
          const username = data.username;
          const newFileName = `${username}.png`;
          const uploadPath = './public/assets/icon/pfp/' + newFileName;

          const buffer = await file.arrayBuffer();
          fs.writeFileSync(uploadPath, Buffer.from(buffer));
        }

        try {
          const newUser = await db.user.create({
            data: {
              username: data.username,
              password: data.password,
              name: data.name,
              email: data.email,
              sex: data.sex,
              pfp: `/assets/icon/pfp/${data.username}.png`,
              score: 0,
              theme: 'light',
            },
          });

          return new Response(null, {
            status: 302,
            headers: {
              Location: '/login',
            },
          });
        } catch (error) {
          return {
            errors: {
              status: 500,
              generalReg:
                'An error occurred while creating the user. Please try again later.',
            },
          };
        }
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
      general?: string;
      username?: string;
      password?: string;
      name?: string;
      email?: string;
      sex?: string;
      pfp?: string;
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
          >
            <form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'register' && 'opacity-0 scale-0 absolute'
              }`}
            >
              <div>
                <InputForm inputType="username" inputName="username" />
                <ErrorMessage>{actionData?.errors?.username}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="password" inputName="password" />
                <ErrorMessage>{actionData?.errors?.password}</ErrorMessage>
              </div>
              <Button
                textBtn="Log In"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="logIn"
              />
              <ErrorMessage>{actionData?.errors?.general}</ErrorMessage>
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
            >
              <div>
                <InputForm inputType="username" inputName="username" />
                <ErrorMessage>{actionData?.errors?.username}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="password" inputName="password" />
                <ErrorMessage>{actionData?.errors?.password}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="name" inputName="name" />
                <ErrorMessage>{actionData?.errors?.name}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="email" inputName="email" />
                <ErrorMessage>{actionData?.errors?.email}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="gender" inputName="sex" />
                <small>*(male/female/other)</small>
                <ErrorMessage>{actionData?.errors?.sex}</ErrorMessage>
              </div>
              <div>
                <InputForm inputType="file" inputName="pfp" />
                <ErrorMessage>{actionData?.errors?.pfp}</ErrorMessage>
              </div>
              <Button
                textBtn="Sign up"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
                name="_action"
                value="singUp"
              />
              <ErrorMessage>{actionData?.errors?.general}</ErrorMessage>
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
