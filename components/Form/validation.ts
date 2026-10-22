import { z } from "zod";

/* ─── Schema ──────────────────────────────────────────────── */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or fewer" }),

  email: z.email({ message: "Enter a valid email address" }),

  budget: z
    .string()
    .max(100, { message: "Budget must be 100 characters or fewer" })
    .optional()
    .default(""),

  message: z
    .string()
    .min(10, { message: "Please provide at least 10 characters" })
    .max(2000, { message: "Message must be 2000 characters or fewer" }),
});

/* ─── Inferred type (matches ContactFormValues in types.ts) ─ */
export type ContactInput = z.infer<typeof contactSchema>;
