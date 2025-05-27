import { z } from "zod"

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(30, { message: "Password must be at most 30 characters" }),
});

export type FormSchema = z.infer<typeof formSchema>;
export { formSchema };