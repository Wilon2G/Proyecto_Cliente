import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { InputForm } from '~/components/Inputs';
import { requiredLoggedInUser, setUser } from '~/utils/auth.server';

export async function loader({ request }: any) {
  const user = await requiredLoggedInUser(request);
  return json(user);
}

export async function action({ request }: any) {
  const formData = new URLSearchParams(await request.text());

  const userId = formData.get('userId');
  const name = formData.get('name');
  const email = formData.get('email');
  const sex = formData.get('sex');
  const pfp = formData.get('pfp');
  console.log(pfp);
  const theme = formData.get('theme');

  if (userId && name && email && sex && pfp && theme) {
    await setUser(userId, { name, email, sex, pfp, theme });
    return redirect(`/home/user`); // Redirige a la página del usuario con los datos actualizados
  }

  return json({ error: 'Error updating user' }, { status: 400 });
}

export default function UserProfile() {
  const user = useLoaderData();

  return (
    <div className="p-8 bg-gray-500 bg-opacity-60 rounded-md text-white shadow-lg w-full max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-color">
        User Profile
      </h1>

      <Form method="post" encType="multipart/form-data">
        <input type="hidden" name="userId" value={user.id} />
        <div className="flex flex-col items-center text-color ">
          <img
            src={user.pfp}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mb-6 border-4 border-white shadow-md"
          />

          <div className="w-full flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                className="w-full p-2 rounded-lg bg-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full p-2 rounded-lg bg-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Sex:</label>
              <select
                name="sex"
                defaultValue={user.sex}
                className="w-full p-2 rounded-lg bg-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Profile Picture URL:
              </label>
              <InputForm inputType="file" inputName="pfp" />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
