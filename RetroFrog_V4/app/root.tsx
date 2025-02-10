import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={'  bg-image-bg font-primary-font text-color'}>
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

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Oh nooooo!</title>
      </head>
      <body className="flex h-screen items-center justify-center bg-primary text-color">
        <div className="text-center p-6 rounded-lg shadow-lg border border-primary-hover bg-primary-trans">
          <h1 className="text-6xl font-bold text-primary-reverse animate-bounce">
            🎮 Oops! Game Over! 🎮
          </h1>
          {isRouteErrorResponse(error) ? (
            <>
              <p className="text-2xl mt-2">
                {error.status} - {error.statusText}
              </p>
              <p className="mt-4 text-color-hover">
                Looks like you hit a bug! 🐛
              </p>
              <p className="text-sm italic text-color">{error.data.message}</p>
            </>
          ) : (
            <>
              <p className="text-2xl mt-2">
                Something unexpected happened... 🤯
              </p>
              {error instanceof Error ? (
                <p className="text-sm italic text-color">{error.message}</p>
              ) : null}
            </>
          )}
          <Link
            to="/home/main"
            className="inline-block mt-6 px-4 py-2 bg-primary-hover-reverse text-primary rounded-lg shadow-md hover:bg-primary-reverse transition"
          >
            🕹️ Try Again!
          </Link>
        </div>
      </body>
    </html>
  );
}
