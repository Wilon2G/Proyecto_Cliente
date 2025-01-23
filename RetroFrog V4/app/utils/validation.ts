import { z } from 'zod';

type FieldErrors = { [key: string]: string };

export default function validateForm<X>(
  formData: FormData,
  zodSchema: z.Schema<X>,
  successFx: (data: X) => unknown,
  errorFx: (errors: FieldErrors) => unknown,
) {
  const result = zodSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors: FieldErrors = {};

    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });

    return errorFx(errors);
  }

  return successFx(result.data);
}
