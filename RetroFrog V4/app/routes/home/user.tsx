import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import classNames from 'classnames';
import Button from '~/components/Buttons';
import { InputForm } from '~/components/Inputs';
import { requiredLoggedInUser, setUser } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);

  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());

  const userId = formData.get('userId');
  const name = formData.get('name');
  const email = formData.get('email');
  const pfp = formData.get('pfp');
  const theme = formData.get('theme');

  if (userId && name && email && pfp && theme) {
    await setUser(userId, { name, email, pfp, theme });
    return redirect(`/home/user`);
  }

  return new Response(JSON.stringify({ error: 'Error updating user' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="h-full bg-gray-500 bg-opacity-60 rounded-md flex flex-col items-center py-12 w-full px-4 self-center">
      <div className="p-8 bg-primary bg-opacity-60 rounded-md shadow-lg w-full max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

        <Form method="post" encType="multipart/form-data">
          <input type="hidden" name="userId" value={user.id} />
          <div className="flex flex-col items-center">
            <img
              src={user.pfp}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mb-6 border-4 border-primary-reverse shadow-md"
            />

            <div className="w-full flex flex-col gap-4">
              <div>
                <InputForm
                  inputType="text"
                  inputName="name"
                  defaultValue={user.name}
                  classname="bg-primary-reverse text-color-reverse"
                />
              </div>

              <div>
                <InputForm
                  inputType="email"
                  inputName="email"
                  defaultValue={user.email}
                  classname="bg-primary-reverse text-color-reverse"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 ">
                  Sex:
                  <select
                    name="sex"
                    defaultValue={user.sex}
                    className={classNames(
                      'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none ',
                      'border-color-reverse bg-primary-reverse text-color-reverse',
                    )}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <div>
                <InputForm
                  inputType="file"
                  inputName="pfp"
                  inputText="Profile Picture URL:"
                  classname="bg-primary-reverse text-color-reverse"
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  textBtn="Cancel"
                  typeBtn="button"
                  className="w-1/2 px-6 py-2 bg-red-500 hover:bg-red-700 text-white"
                />
                <Button
                  textBtn="Save"
                  typeBtn="submit"
                  className="w-1/2 px-6 py-2 bg-green-500 hover:bg-green-700 text-white"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
