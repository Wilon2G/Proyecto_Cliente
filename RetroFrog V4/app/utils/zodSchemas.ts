import { z } from "zod";


export const logInSchema = z.object({
    userName: z.string().min(1,  "You must fill the User Name field" ),
    password: z.string().nonempty({message:"You must fill the Password field"}).min(5, { message: "Password must have at least five characters" }),
});
