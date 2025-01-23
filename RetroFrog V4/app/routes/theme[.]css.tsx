import { LoaderFunction } from '@remix-run/node';
import { getThemes, getUserId } from '~/models/user.server';
import { getSession } from '~/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  let themeChoice = 'dark';
  let fontChoice = 'arial';
  let bgChoice = '/assets/background/1-bg.png';

  //Si no existe la cookie de sesión es que el usuario aún no se ha logeado o se ha logueado pero aún no se ha sacado la info de la base de datos
  if (session.get('background') !== undefined) {
    themeChoice = session.get('theme');
    fontChoice = session.get('fontFamily');
    bgChoice = session.get('background');
  } else {
    const userId = await getUserId(request);

    if (userId) {
      const themeData = await getThemes(userId);
      console.log(themeData);
      if (themeData) {
        themeChoice = themeData[0];
        bgChoice = themeData[1];
        fontChoice = themeData[2];
      }
    }
  }

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

  const themeStyles = themeChoice === 'dark' ? darkModeStyles : lightModeStyles;

  const data = `
    :root {
      ${themeStyles}
      --fontFamily:${fontChoice};
      --bgImage:url(${bgChoice});
    }
  `;

  return new Response(data, { headers: { 'content-type': 'text/css' } });
};
