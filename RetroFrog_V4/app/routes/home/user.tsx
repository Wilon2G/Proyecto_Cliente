import { Form, useLoaderData } from '@remix-run/react';
import fs from 'fs';
import path from 'path';
import Button from '~/components/Buttons';
import { InputForm } from '~/components/Inputs';
import { requiredLoggedInUser } from '~/utils/auth.server';
import prisma from '~/utils/prismaClient';

// Configuración de la ruta donde se guardarán las imágenes
const UPLOAD_DIR = path.join(process.cwd(), 'public/assets/icon/pfp/');

export async function loader({ request }: { request: Request }) {
  const user = await requiredLoggedInUser(request);
  return { user };
}

export async function action({ request }: { request: Request }) {
  const formData = new FormData(await request.formData());

  const userId = formData.get('userId');
  const name = formData.get('name');
  const email = formData.get('email');
  const theme = formData.get('theme');
  const sex = formData.get('sex');

  // Procesar archivo subido (si existe)
  const file = formData.get('pfp');
  let pfpUrl = '';

  if (file && file instanceof Blob) {
    // Generar un nombre único para la imagen usando el userId y la fecha actual
    const fileExtension = path.extname(file.name);
    const fileName = `${userId}-${Date.now()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Crear directorio si no existe
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Mover el archivo a la carpeta de imágenes
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Establecer la URL de la imagen
    pfpUrl = `/assets/icon/pfp/${fileName}`;
  }

  if (userId && name && email && theme && sex) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          pfp: pfpUrl || undefined, // Usar URL de la imagen subida
          theme,
          sex,
        },
      });
      return {};
    } catch (error) {
      return { error: 'Error updating user' };
    }
  }

  return { error: 'Missing fields' };
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 bg-primary bg-opacity-60 rounded-md shadow-lg w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">User Profile</h1>

      <Form method="post" encType="multipart/form-data">
        <input type="hidden" name="userId" value={user.id} />
        <div className="flex flex-col items-center">
          <img
            src={user.pfp}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mb-2 border-4 border-primary-reverse shadow-md"
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none border-color-reverse bg-primary-reverse text-color-reverse"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 ">
                Profile Picture:
                <input
                  type="file"
                  name="pfp"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none border-color-reverse bg-primary-reverse text-color-reverse"
                />
              </label>
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
  );
}
