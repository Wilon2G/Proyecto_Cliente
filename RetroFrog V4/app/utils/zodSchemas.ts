import { z } from "zod";


export const logInSchema = z.object({
    userName: z.string().min(1,  "You must fill the User Name field" ).email("Your User Name must be your email"),
    password: z.string().nonempty({message:"You must fill the Password field"}).min(5, { message: "Password must have at least five characters" }),
});

export const registerSchema = z.object({
    userName: z.string().min(1,  "You must fill the User Name field" ).email("Your User Name must be your email"),
    password: z.string().nonempty({message:"You must fill the Password field"}).min(5, { message: "Password must have at least five characters" }),
    name: z.string().min(1, "You must fill this field"),
});

