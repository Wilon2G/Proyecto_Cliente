import { LoaderFunction } from '@remix-run/node';
import { getThemes } from '~/models/themes.server';
import { getUserId } from '~/models/user.server';
import { getSession } from '~/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  let themeChoice = 'dark';
  let fontChoice = 'arial';
  let bgChoice = '/assets/background/1-bg.avif';

  //Si no existe la cookie de sesión es que el usuario aún no se ha logeado o se ha logueado pero aún no se ha sacado la info de la base de datos
  if (session.get('background') !== undefined) {
    themeChoice = session.get('theme');
    fontChoice = session.get('fontFamily');
    bgChoice = session.get('background');
  } else {
    const userId = await getUserId(request);

    if (userId) {
      const themeData = await getThemes(userId);
      //console.log(themeData);
      if (themeData) {
        themeChoice = themeData[0];
        bgChoice = themeData[1];
        fontChoice = themeData[2];
      }
    }
  }

  const darkModeStyles = `
    --primary: #151A2D;
    --primary-trans: rgba(21,26,45,0.8);
    --primary-hover: #1F253D;
    --primary-reverse: #E0E0E0;
    --primary-hover-reverse: #D6D8DB;
    --color: #B0B0B0;
    --color-reverse: #1F253D;
    --color-hover: #D6D8DB;
    --icon-fill: #CCCCCC;
    --icon-fill-reverse: #151A2D;
    --icon-fill-hover: #FFFFFF;
    --icon-bg-hover: rgba(224, 224, 224, 0.3);
    --gradient-from: rgba(0, 0, 0, 0.6);
    --gradient-to: rgba(0, 0, 0, 0.8);
`;

  const lightModeStyles = `
    --primary: #F0F0F0;
    --primary-trans: rgba(21,26,45,0.8);
    --primary-hover: #D6D8DB;
    --primary-reverse: #151A2D;
    --primary-hover-reverse: #1F253D;
    --color: #1F253D;
    --color-reverse: #CCCCCC;
    --color-hover: #1F253D;
    --icon-fill: #1F253D;
    --icon-fill-reverse: #F0F0F0;
    --icon-fill-hover: #CCCCCC;
    --icon-bg-hover: rgba(21, 26, 45, 0.6);
    --gradient-from: rgba(240, 240, 240, 0.4);
    --gradient-to: rgba(240, 240, 240, 0.8);
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
