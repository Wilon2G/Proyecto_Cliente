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
      <body className="bg-image-bg font-primary-font text-color">
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
  const statusCode = isRouteErrorResponse(error) ? error.status : 500;
  /*  const statusMessage = isRouteErrorResponse(error)
    ? error.statusText
    : 'Something went wrong!'; */

  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Error {statusCode}</title>
      </head>
      <body
        style={{
          fontFamily: 'arial',
          color: 'var(--color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              background: 'var(--primary)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              gap: '1.5rem',
            }}
          >
            {isRouteErrorResponse(error) ? (
              <>
                <h1>
                  🎮 {error.status} - {error.statusText} 🎮
                </h1>
                <p>You are seeing this page because an error occurred. 🐛</p>
                <p>{error.data.message}</p>
              </>
            ) : (
              <>
                <h1>🎮 Whoops! 🎮</h1>
                <p>
                  You are seeing this page because an unexpected error occurred.
                </p>
                {error instanceof Error ? <p>{error.message}</p> : null}
              </>
            )}

            <div style={{ marginTop: '2rem', animation: 'wiggle 1s infinite' }}>
              <img
                src="../public/assets/gif/cryFrogError.gif"
                alt="Crying Frog"
                style={{
                  margin: '0 auto',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
                width="400px"
              />
            </div>

            <Link
              to="/login"
              style={{
                marginTop: '2rem',
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'var(--icon-fill)',
                color: 'var(--icon-fill-reverse)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, background 0.2s',
                cursor: 'pointer',
              }}
            >
              🕹️ Go to Login
            </Link>
          </div>
        </div>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}
