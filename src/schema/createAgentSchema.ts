import { z } from "zod"

export const createAgentSchema = z.object({
  name: z.string().min(3,{ message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  countryCode: z.string().startsWith("+"),
  phone: z
         .string()
         .min(7,{ message: "Phone number must be at least 7 digits" })
         .max(15, { message: "Phone number must be at most 15 digits" }),
  password: z.string().min(6,{ message: "Password must be at least 6 characters" })
})

export type CreateAgentSchema = z.infer<typeof createAgentSchema>
