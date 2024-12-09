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
    <div className="min-h-screen flex flex-row items-center justify-center bg-gradient-to-br">
      <div>
        <h1>Retrofrog</h1>
        <h3>Welcome to the first online arcade experience</h3>
        <p>
          Login to discover our full catalog or Signup if you dont have an
          account
        </p>
      </div>
      <div className="flex w-2.5/5 h-[400px] shadow-lg rounded-lg overflow-hidden">
        <div
          className={`flex-1 transition-all duration-500 ${
            activePanel === 'login' ? 'flex-[2]' : 'flex-[1]'
          } bg-white text-gray-900 p-8 flex flex-col justify-center items-center cursor-pointer`}
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
          <h2 className="text-2xl font-bold mb-6 text-center">
            Iniciar Sesión
          </h2>
          {activePanel === 'login' && (
            <Form method="post" className="space-y-4 w-full max-w-sm">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="userName"
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu contraseña"
                />
              </div>
              <Button
                textBtn="Entrar"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              />
            </Form>
          )}
        </div>

        <div
          className={`flex-1 transition-all duration-500 ${
            activePanel === 'register' ? 'flex-[2]' : 'flex-[1]'
          } bg-gray-100 text-gray-900 p-8 flex flex-col justify-center items-center cursor-pointer`}
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
          <h2 className="text-2xl font-bold mb-6">Registrarse</h2>
          {activePanel === 'register' && (
            <Form method="post" className="space-y-4 w-full max-w-sm">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="userName"
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu contraseña"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu correo electrónico"
                />
              </div>
              <Button textBtn="Register" typeBtn="submit" className="" />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
