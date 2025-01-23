import { ActionFunction, LoaderFunction } from '@remix-run/node';
import Custom from '~/components/Custom';
import Developers from '~/components/Developers';
import PrivacyPolices from '~/components/PrivacyPolices';
import { z } from 'zod';
import { commitSession, getSession } from '~/sessions';
import validateForm from '~/utils/validation';
import { updateTheme } from '~/models/user.server';
import { requiredLoggedInUser } from '~/utils/auth.server';

const customSchema = z.object({
  theme: z.string(),
  background: z.string(),
  fontFamily: z.string(),
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  // Devolver los valores existentes en la sesión.
  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/bg3.jpg',
    fontFamily: session.get('fontFamily') || 'arial',
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const formData = await request.formData();

  return validateForm(
    formData,
    customSchema,
    async ({ theme, background, fontFamily }) => {
      //Alamacenamos valores
      session.set('theme', theme);
      session.set('background', background);
      session.set('fontFamily', fontFamily);

      updateTheme(user.id, theme, background, fontFamily);
      //console.log("tema updateadooooo");
      return new Response(null, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    },
    (errors) =>
      new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
  );
};

export default function Settings() {
  return (
    <>
      <div className="flex flex-col justify-center gap-16 text-center ">
        <div className="aboutUs">
          <Developers />
        </div>

        <div className="custom">
          <Custom />
        </div>

        <div className="privacy">
          <PrivacyPolices />
        </div>
      </div>
    </>
  );
}
