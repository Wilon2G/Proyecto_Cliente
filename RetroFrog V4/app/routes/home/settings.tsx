import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { z } from 'zod';
import Custom from '~/components/Custom';
import Developers from '~/components/Developers';
import PrivacyPolices from '~/components/PrivacyPolices';
import { updateTheme } from '~/models/user.server';
import { commitSession, getSession } from '~/sessions';
import { requiredLoggedInUser } from '~/utils/auth.server';
import validateForm from '~/utils/validation';

const customSchema = z.object({
  theme: z.string(),
  background: z.string(),
  fontFamily: z.string(),
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  return {
    theme: session.get('theme') || 'dark',
    background: session.get('background') || '/assets/background/1-bg.png',
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
      session.set('theme', theme);
      session.set('background', background);
      session.set('fontFamily', fontFamily);

      updateTheme(user.id, theme, background, fontFamily);

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
    <div className="h-fit bg-gray-200 bg-opacity-60 rounded-md flex flex-col items-center py-12 w-full max-w-4xl px-4 self-center">
      <h1 className="text-4xl font-semibold  text-gray-800 mb-4">Settings</h1>

      <div className="w-full max-w-4xl px-4 mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Developers:
        </h2>

        <Developers />
      </div>
      <h2 className="text-3xl font-semibold  text-gray-800 mb-4">
        Personalization
      </h2>
      <div className="w-full max-w-4xl bg-primary shadow-lg rounded-lg p-8">
        <div className="mb-10">
          <Custom />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Privacy Policies
        </h2>
        <PrivacyPolices />
      </div>
    </div>
  );
}
