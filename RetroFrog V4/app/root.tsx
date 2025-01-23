import React, { useState } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';

import './tailwind.css';
import { getSession } from './sessions';
import { changeThemeColor } from './utils/themeColors';

export const meta: MetaFunction = () => {
  return [
    { title: 'RetroFrog' },
    { name: 'description', content: 'Welcome to RetroFrog!' },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: '/theme.css' },
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

/* export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  // Verificar si la sesión tiene datos
  if (!session.has('theme')) {
    // session.set('theme', 'dark');
    // session.set('background', '/assets/background/bg3.jpg');
    // session.set('fontFamily', 'arial');

    // const cookie = await commitSession(session);
    // return new Response(null, {
    //   status: 200,
    //   headers: { 'Set-Cookie': cookie },
    // });
    return null;
  }

  // Devolver los valores existentes en la sesión.
  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/bg3.jpg',
    fontFamily: session.get('fontFamily') || 'arial',
  };
}; */

/* export type themeChanges = {
  theme: string;
  background: string;
  fontFamily: string;
}; */

export function Layout({ children }: { children: React.ReactNode }) {
  /* const data = useLoaderData<themeChanges>();

  const background = data?.background || '/assets/background/bg3.jpg';
  const fontFamily = data?.fontFamily || 'arial';
  const theme = data?.theme;
  const colors = changeThemeColor(theme || 'dark');

  const { textColor, textHighlight } = colors;
  const [isHovered, setIsHovered] = useState(false); */

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={
          'h-full bg-image-bg font-primary-font text-primary hover:text-primary-hover'
        }
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
