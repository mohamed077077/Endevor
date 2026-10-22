import type { ContactFormValues, ContactResponse } from "./types";
import { ApiError } from "./types";

/* ─── HTTP helper: POST /api/add ──────────────────────────── */
export async function addContactRequest(
  payload: ContactFormValues,
): Promise<ContactResponse> {
  const res = await fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  const json: ContactResponse = await res.json().catch(() => ({
    success: false,
    message: "Unexpected server response.",
  }));

  if (!res.ok) {
    throw new ApiError(json.message || "", res.status);
  }

  return json;
}
