import { z } from 'zod';

export const logInSchema = z.object({
  emailLog: z
    .string()
    .min(5, 'Your user name cannnot be less than five character'),
  passwordLog: z.string().min(5, 'Password must have at least five characters'),
});

export const registerSchema = z.object({
  passwordReg: z.string().min(5, 'Password must have at least five characters'),
  nameReg: z.string().min(1, 'You must fill this field'),
  emailReg: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'), // Añadido para validar el email
});

export const customSchema = z.object({
  theme: z.string().optional(),
  background: z.string().optional(),
  fontFamily: z.string().optional(),
});

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const formSchema = z.object({
  adImage: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
