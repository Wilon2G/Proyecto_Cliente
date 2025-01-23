import { LoaderFunction } from '@remix-run/node';
import { sessionCookie } from '~/cookies';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await sessionCookie.parse(cookieHeader);

  const darkModeStyles = `
    --primary:#151a2d;
    --primary-hover:#1f253d;
    --primary-reverse:#ffffff;
    --primary-hover-reverse:#f3f4f6;
    --color:#e6e6e6;
    --color-reverse:#1f253d;
    --color-hover:#f3f4f6;
    --icon-fill:#f5f5f5;
    --icon-fill-hover:#151A2D;
    --icon-bg-hover:#f5f5f5;
  `;

  const lightModeStyles = `
    --primary:#ffffff;
    --primary-hover:#f3f4f6;
    --primary-reverse:#151a2d;
    --primary-hover-reverse:#1f253d;
    --color:#1f253d;
    --color-reverse:#e6e6e6;
    --color-hover:#1f253d;
    --icon-fill:#151A2D;
    --icon-fill-hover:#f5f5f5;
    --icon-bg-hover:#151A2D;
  `;

  const themeStyles =
    session.theme === 'dark' ? darkModeStyles : lightModeStyles;

  const data = `
    :root {
      ${themeStyles}
      --fontFamily:${session.fontFamily};
      --bgImage:url(${session.background});
    }
  `;

  return new Response(data, { headers: { 'content-type': 'text/css' } });
};
