import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import React from 'react';

import { commitSession, getSession } from './sessions';

import './tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'RetroFrog' },
    { name: 'description', content: 'Welcome to RetroFrog!' },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  // Verificar si la sesión tiene datos
  if (!session.has('theme')) {
    session.set('theme', 'dark');
    session.set('background', '/assets/background/bg3.jpg');
    session.set('fontFamily', 'arial');

    const cookie = await commitSession(session);
    return new Response(null, {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  }

  // Devolver los valores existentes en la sesión.
  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/bg3.jpg',
    fontFamily: session.get('fontFamily') || 'arial',
  };
};

export type themeChanges = {
  theme: string;
  background: string;
  fontFamily: string;
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Obtener los datos de la sesión
  const { bgColor, bgImage, fontFamily } = useLoaderData<themeChanges>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="h-full"
        style={{
          backgroundColor: `${bgColor}`, // Aplicar el color de fondo
          backgroundImage: `url(${bgImage})`, // Aplicar la imagen de fondo
          fontFamily: `${fontFamily}`, // Aplicar la fuente
        }}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
