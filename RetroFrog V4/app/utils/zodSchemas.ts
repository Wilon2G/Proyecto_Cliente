import { z } from "zod";


export const logInSchema = z.object({
    userNameLog: z.string().min(1,"Your User Name must be your email"),
    passwordLog: z.string().min(5,  "Password must have at least five characters" ),
});

export const registerSchema = z.object({
    userNameReg: z.string().email("Your User Name must be your email"),
    passwordReg: z.string().min(5, "Password must have at least five characters" ),
    nameReg: z.string().min(1, "You must fill this field"),
});

