import { Form,    Outlet,    redirect, useActionData } from '@remix-run/react';
import React, { useState } from 'react';
import { logInSchema, registerSchema } from '../utils/zodSchemas';
import validateForm from '~/utils/validation';
import Button from '~/components/Buttons';
import InputForm from '~/components/InputForm';
import { ErrorMessage } from '~/components/ErrorMessage';
import { checkUser, userExists } from '~/models/user.server';
import { requiredLoggedOutUser } from '~/utils/auth.server';
import { LoaderFunction } from '@remix-run/node';
import { commitSession, getSession } from '~/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  await requiredLoggedOutUser(request);
  return null;
};



export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  //Descomentar esto para ver los datos que se envían por los formularios de login y registro
  //console.log(formData);
  if (formData.get("_action")==="logIn") {
    //console.log("Ha entrado en el action de login");
    return validateForm(
      formData,
      logInSchema,
      async (data) => {
        //console.log(data.usernameLog + ' y ' + data.passwordLog);
        const userId= await checkUser(data.usernameLog,data.passwordLog);
        if (!userId) {
          return {
            errors: {
              status:400,
              generalLog: "User or password are incorrect",
            },
          };
        }
        else{
          session.set("userId",userId);
          const cookie = await commitSession(session);
          return redirect("/home/main",{
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
  }
  else{
    //console.log("Ha entrado en el action de registro");
    return validateForm(
      formData,
      registerSchema,
      async (data) => {
        //console.log(data.usernameReg + ' y ' + data.passwordReg);
        const userExist=await userExists(data.usernameReg);
        if (userExist) {
          return {
            errors: {
              status:400,
              generalReg: "User Name is already registered, please Log In",
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
  const actionData = useActionData<typeof action>();
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');

  const handlePanelChange = (panel: 'login' | 'register') => {
    if (activePanel !== panel) {
      setActivePanel(panel);
    }
  };

  return (
    <div className="h-full flex justify-end">
      <div className="h-full w-2/5 bg-primaryDark text-textDark backdrop-blur-lg">
        <div className="w-full h-1/5 p-6 flex items-center">
          <img
            src="../../public/assets/icon/frog-logo3.png"
            alt="Frog Logo"
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

          <SlidePannel
            panelId="register"
            otherPanelId="login"
            activeTitle="Welcome!"
            inactiveTitle="Don&apos;t have an account yet?"
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
  const isActive = activePanel === panelId;

  return (
    <div
      className={`flex-1 transition-all duration-500 ${
        isActive
          ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
          : 'flex-[1]'
      } p-8 flex flex-col justify-center items-center cursor-pointer`}
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
          isActive &&
          'translate-y-[-50px] opacity-0 absolute top-[-200px]'
        }`}
      >
        <p className="mb-4 text-gray-400 font-bold text-base">
          {inactiveTitle}
        </p>
        <h2 className="text-lg font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-xl z-50 hover:bg-primaryLight hover:text-textLight border-2">
          {buttonText}
        </h2>
      </div>

      <div
        className={`transition-all duration-1000 ${
          !isActive &&
          'translate-y-[50px] opacity-0 absolute top-[-200px]'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {activeTitle}
        </h2>
      </div>

      {children}
    </div>
  );
}
