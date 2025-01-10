import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import { z } from "zod";
import { commitSession, getSession } from "~/sessions";
import validateForm from "~/utils/validation";
import Button from "./Buttons";

//Para los errors
interface ActionData {
    theme?: string; 
    background?: string; 
    fontFamily?: string; 
  errors?: {
      theme?: string; 
      background?: string; 
      fontFamily?: string; 
  };
}

const backgrounds = [
    '/assets/background/bg.jpg',
    '/assets/background/bg1.jpg',
    '/assets/background/bg2.jpg',
    '/assets/background/bg3.jpg',
];

/**const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];*/
  
const customSchema = z.object({
    theme: z.string(),
    background: z.string(),
    fontFamily: z.string(),
    /*profilePic: z
        .any()
        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),*/
});

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('cookie');
    const session = await getSession(cookieHeader);
    console.log('Session data:', session.data);

    return null;
}

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('cookie');
    const session = await getSession(cookieHeader);

    const formData = await request.formData();

    return validateForm(
        formData,
        customSchema,
        async ({ theme, background, fontFamily }) => {
            if (theme === null||background === null||fontFamily === null) {
        return {
          errors: { error:'The value must be selected' },
          status: 401,
        };
      }

      //Alamacenamos valores
            session.set('theme', theme);
            session.set('background', background);
            session.set('fontFamily', fontFamily);

return redirect('/home/settings', {
        headers: {
          'Set-Cookie': await commitSession(session), 
        },
      });

         },
        (errors) => ({ errors, status: 400 }))
}

function Custom2() {
  const actionData = useActionData<ActionData>();
  
  //REVISAR COMMIT PARA SESSION

    return ( <>
          <h2 className="text-2xl font-semibold   text-textLight hover:text-textLightHighlight mt-1 mb-1">
            Customize
          </h2>
    
        <div className=" bg-primaryLight flex flex-col items-center gap-4 w-full h-full p-5 rounded-lg text-center">
        <Form method="post">
          
            {/* Tema oscuro-claro */}
            <div className="flex items-center gap-2">
              <label htmlFor="theme">Select Theme</label>
                    <div className="flex gap-2">
                        <input type="radio" name="theme" id="theme" value='dark' />
                        <input type="radio" name="theme" id="theme" value='light'/>
                    </div>
                    <ErrorMessage>{actionData?.errors?.theme}</ErrorMessage>
            </div>
    
            {/* Fondo de pantalla */}
            <div className="flex flex-col items-center gap-2">
              <h3>Select Background Image</h3>
                    <div className="flex gap-2">
                        <ul>
                            {backgrounds.map((bg, index) => (
                                <li key={index}><input type="radio" name="background" id={`bg ${index}`} key={index} className='w-4'/>
                                <label htmlFor="background"><img src={bg} alt={`bg ${index}`} /></label>
                                </li>
                ))}
                        </ul>
                        <ErrorMessage>{actionData?.errors?.background}</ErrorMessage>
                
              </div>
            </div>
    
            {/* Fuente */}
            <div className="flex items-center gap-2">
              <label htmlFor="fontFamily">Select Font</label>
                    <select
                        name="fontFamily"
                id="fontFamily"
                className="p-2 rounded-md bg-gray-500"
              >
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Arial', sans-serif">Arial</option>
                    </select>
                    <ErrorMessage>{actionData?.errors?.fontFamily}</ErrorMessage>
            </div>
    <Button
            textBtn="Save Changes"
            typeBtn="submit"
            className="bg-white-600 hover:bg-indigo-700 text-lg"
          />
            {/* Foto *
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="profile-pic">Profile Picture</label>
              <input
                        type="file"
                        name="profilePic"
                id="profilePic"
                accept="image/*"
                className="border p-2 rounded-md"
              />
              {/*profilePic && (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full mt-2 object-cover"
                />
              )
            </div>*/}
            </Form>
            
          </div>
        </> );
}

//VER DONDE METER ESTO
interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> { }

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames('text-red-600 text-xs', className)}></p>
  ) : null;
}


/**Estilos ul imagenes bg
 * ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

input[type="radio"][id^="cb"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
}

label:before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid grey;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

label img {
  height: 100px;
  width: 100px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

:checked + label {
  border-color: #ddd;
}

:checked + label:before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}

:checked + label img {
  transform: scale(0.9);
  box-shadow: 0 0 5px #333;
  z-index: -1;
}
 */
export default Custom2;