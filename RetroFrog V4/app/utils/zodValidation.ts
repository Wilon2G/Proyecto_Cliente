import { z } from "zod";


const logInSchema = z.object({
    userName: z.string({ message: "Invalid User Name" }),
    password: z.string().min(5, { message: "Password must have at least five characters" }),
});


export  function ValidateLogin(formData){
const result = logInSchema.safeParse(formData);

if (result.error) {
    return result.error.format();
}

return result.data;

}