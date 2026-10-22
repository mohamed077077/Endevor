import { contactSchema } from "@/components/Form/validation";
import type { ContactFormValues } from "@/components/Form/types";

type ContactResponse = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactResponse> {
  // Validate the payload before sending it.
  const validation = contactSchema.safeParse(values);

  if (!validation.success) {
    throw new Error(
      validation.error.issues[0]?.message ?? "Invalid contact form data."
    );
  }

  // Send the validated data to the API route.
  const response = await fetch("/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validation.data),
  });

  const result = (await response.json().catch(() => null)) as
    | ContactResponse
    | null;

  if (!response.ok || !result?.ok) {
    throw new Error(
      result?.message ?? "Failed to send your message. Please try again."
    );
  }

  return result;
}