import { PrismaClient } from '@prisma/client';
import { Form, redirect } from '@remix-run/react';
import { useState } from 'react';
import Button from '~/components/Button';

const prisma = new PrismaClient();

export async function loader() {
  const users = await prisma.user.findMany();
  return { users };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userName = formData.get('userName');
  const password = formData.get('password');

  const user = await prisma.user.findUnique({
    where: { userName: userName as string },
  });
  if (!user || user.password !== password) {
    return '';
  }
  return redirect('/home/main');
}

export default function LoginPage() {
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');

  return (
    <div className="h-full flex justify-end">
      <div className="h-full w-2/5 bg-primaryDark backdrop-blur-lg">
        <div className="w-full h-1/5 p-6 flex items-center text-textDark">
          <img
            src="../../public/assets/icon/frog-logo3.png"
            alt=""
            className="w-32 h-auto"
          />
          <div className="w-full">
            <h1 className="text-4xl">Retrofrog</h1>
            <h3 className="text-xl">
              Welcome to the first online arcade experience
            </h3>
            <p>
              Login to discover our full catalog or Signup if you don&apos;t
              have an account
            </p>
          </div>
        </div>
        <div className="w-full h-4/5 flex">
          <div
            className={`h-full flex-1 transition-all duration-500 ${
              activePanel === 'login'
                ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                : 'flex-[1] '
            }  text-textDark p-8 flex flex-col justify-center items-center cursor-pointer`}
            onClick={() => setActivePanel('login')}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault(); // Evitar scroll cuando se presiona "Espacio"
                setActivePanel('register');
              }
            }}
            tabIndex={0} // Permite navegar con Tab
            role="button" // Define el elemento como un botón para la accesibilidad
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {activePanel === 'login' && (
              <Form method="post" className="space-y-4 w-full max-w-sm">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="userName"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                    placeholder="Your username"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                    placeholder="Your password"
                  />
                </div>
                <Button
                  textBtn="Login"
                  typeBtn="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
                />
              </Form>
            )}
          </div>

          <div
            className={`h-full flex-1 transition-all duration-500 ${
              activePanel === 'register'
                ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                : 'flex-[1] '
            }  text-textDark p-8 flex flex-col justify-center items-center cursor-pointer`}
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
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            {activePanel === 'register' && (
              <Form method="post" className="space-y-4 w-full max-w-sm">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="userName"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                    placeholder="Your username"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                    placeholder="Your password"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                    placeholder="Your email"
                  />
                </div>
                <Button textBtn="Register" typeBtn="submit" className="" />
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
