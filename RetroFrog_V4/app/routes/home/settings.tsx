import { ActionFunction, LoaderFunction } from '@remix-run/node';
import Custom from '~/components/settings/Custom';
import Developers from '~/components/settings/Developers';
import PrivacyPolices from '~/components/settings/PrivacyPolices';
import { updateTheme } from '~/models/themes.server';

import { commitSession, getSession } from '~/sessions';
import { requiredLoggedInUser } from '~/utils/auth.server';
import validateForm from '~/utils/validation';
import { customSchema } from '~/utils/zodSchemas';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/1-bg.avif',
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
      //Por si le pasamos algo opcional y algo no
      theme = theme ?? session.get('theme') ?? 'dark';
      background =
        background ??
        session.get('background') ??
        'dark/assets/background/1-bg.avif';
      fontFamily = fontFamily ?? session.get('fontFamily') ?? 'arial';

      session.set('theme', theme);
      session.set('background', background);
      session.set('fontFamily', fontFamily);

      updateTheme(
        user.id,
        theme as string,
        background as string,
        fontFamily as string,
      );

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
      <div className="w-full  px-4 mb-10">
        <Developers />
      </div>
      <div className="w-4/5 bg-primary shadow-lg rounded-lg p-8">
        <div className="mb-10">
          <Custom />
        </div>
      </div>
      <div className="mb-10">
        <PrivacyPolices />
      </div>
    </>
  );
}
