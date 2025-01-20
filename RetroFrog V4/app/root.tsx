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
  //Descomentar para ver los estilos de la sesión
  //console.log("Session data before:", session.data);

  // Verificar si la sesión está vacía
  if (Object.keys(session.data).length === 0) {
    //Descomentar para que se notifique si no había sesión de estilos guardada
    //console.log("Estableciendo valores predeterminados en la sesión");

    // Establecer valores predeterminados
    session.set('theme', 'primaryDark');
    session.set('background', '/assets/background/bg3.jpg');
    session.set('fontFamily', 'arial');

    const cookie = await commitSession(session);
    return new Response(null, {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  }

  // Obtener datos de la sesión
  const bgColor = session.get('theme');
  const bgImage = session.get('background');
  const fontFamily = session.get('fontFamily');
  //Descomentar esto para los estilos de la sesión
  //console.log("[In root.tsx] --> Session data after:", session.data);

  // Serializar los datos como JSON
  const themeChanges = { bgColor, bgImage, fontFamily };

  return themeChanges;
};

export type themeChanges = {
  theme: string;
  background: string;
  fontFamily: string;
};

export function Layout({ children }: { children: React.ReactNode }) {
  //const { bgColor, bgImage, fontFamily } = useLoaderData<themeChanges>();
  //style={{ background: `${bgColor}`,backgroundImage:`url(${bgImage})`,fontFamily:`${fontFamily}`}} Para el body!!!!!!!!!!

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={'h-full'}>
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
