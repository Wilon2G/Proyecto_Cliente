import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import React from 'react';

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

// Aquí definimos el tipo para los cambios de tema
export type themeChanges = {
  theme: string;
  background: string;
  fontFamily: string;
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Obtener los datos de la sesión
  const data = useLoaderData<themeChanges>();

  // Asegurarse de que data tenga valores por defecto en caso de que sea undefined
  const {
    theme = 'dark', // Valor por defecto 'dark' si theme es undefined
    background = '/assets/background/bg3.jpg', // Valor por defecto para el background
    fontFamily = 'arial', // Valor por defecto para fontFamily
  } = data || {}; // Desestructuramos, y si data es undefined, se usa el valor por defecto

  // Si algún valor es undefined, mostramos un mensaje de error
  if (!theme || !background || !fontFamily) {
    return <div>Error loading data</div>;
  }

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
          backgroundColor: theme === 'dark' ? '#151A2D' : '#F5F5F5', // Ajustamos el color de fondo dependiendo del tema
          backgroundImage: `url(${background})`, // Aplicamos la imagen de fondo
          fontFamily: fontFamily, // Aplicamos la familia tipográfica
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
