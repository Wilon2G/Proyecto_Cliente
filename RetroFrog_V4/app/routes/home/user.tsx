import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Button from '~/components/general/Buttons';
import { InputForm } from '~/components/general/Inputs';
import { setUser } from '~/models/user.server';
import { requiredLoggedInUser } from '~/utils/auth.server';

export async function loader({ request }: { request: Request }) {
  const user = await requiredLoggedInUser(request);

  return { user };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const pfpFile = formData.get('pfp') as File | null;

  let pfp = '/assets/icon/pfp/default.avif';

  if (pfpFile && pfpFile.size > 0) {
    const uploadDir = path.join(
      process.cwd(),
      'public',
      'assets',
      'icon',
      'pfp',
    );
    const filePath = path.join(uploadDir, `${userId}.avif`);

    // Crear directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Leer el archivo y guardar el pfp
    const buffer = await pfpFile.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    // Eliminar la imagen anterior si existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    // Guardar el nuevo archivo
    fs.writeFileSync(filePath, uint8Array);
    // Actualizar la ruta de la imagen de perfil
    pfp = `/assets/icon/pfp/${userId}.avif`;
  }
  try {
    setUser(userId, name, email, pfp);
    return redirect(`/home/user`);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating user' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    pfp: user.pfp || '/assets/icon/pfp/default.avif',
  });

  const [imagePreview, setImagePreview] = useState(formData.pfp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejo del cambio de imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Restaurar valores originales
  const handleReset = () => {
    setFormData({
      name: user.name,
      email: user.email,
      pfp: user.pfp || '/assets/icon/pfp/default.avif',
    });
    setImagePreview(user.pfp || '/assets/icon/pfp/default.avif');
  };

  return (
    <div className="p-4 bg-primary bg-opacity-60 rounded-md shadow-lg w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">User Profile</h1>

      <Form method="post" encType="multipart/form-data">
        <input type="hidden" name="userId" value={user.id} />
        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mb-2 border-4 border-primary-reverse shadow-md"
          />

          <div className="w-full flex flex-col gap-4">
            <div>
              <InputForm
                inputType="text"
                inputName="name"
                inputText="Name"
                value={formData.name}
                onChange={handleChange}
                classname="bg-primary-reverse text-color-reverse"
              />
            </div>

            <div>
              <InputForm
                inputType="email"
                inputName="email"
                value={formData.email}
                onChange={handleChange}
                classname="bg-primary-reverse text-color-reverse"
              />
            </div>

            <div>
              <InputForm
                inputType="file"
                inputName="pfp"
                inputText="Profile Picture URL"
                classname="bg-primary-reverse text-color-reverse"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                textBtn="Reset"
                typeBtn="button"
                onClick={handleReset}
                className="w-1/2 px-6 py-2 bg-gray-600 hover:bg-gray-600 text-white"
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
  );
}
