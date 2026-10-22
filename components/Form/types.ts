
/* ─── Shared types across the Form feature ────────────────── */

export interface ContactFormValues {
  name: string;
  email: string;
  budget?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  data?: {
    message: string;
  };
  message?: string;
  fields?: Partial<Record<keyof ContactFormValues, string[]>>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
