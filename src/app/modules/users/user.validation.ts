import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'First name is required',
        }),
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};

// await createUserZodSchema.parseAsync(req)
