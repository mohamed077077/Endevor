
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/components/Form/validation";
import type {
  ContactFormValues,
  ContactResponse,
} from "@/components/Form/types";
import { ApiError } from "@/components/Form/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = process.env.CONTACT_EMAIL ?? "delivered@resend.dev";
const NOTIFY_FROM = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      const fields: Partial<
        Record<keyof ContactFormValues, string[]>
      > = {};

      for (const issue of validation.error.issues) {
        const field = issue.path[0];

        if (
          typeof field === "string" &&
          ["name", "email", "budget", "message"].includes(field)
        ) {
          const key = field as keyof ContactFormValues;
          (fields[key] ??= []).push(issue.message);
        }
      }

      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: "Please check the submitted fields.",
          fields,
        },
        { status: 422 }
      );
    }

    const { name, email, budget, message } = validation.data;

    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `New project inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2>New inquiry from the website</h2>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
          ${budget ? `<p><strong>Budget:</strong> ${esc(budget)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${esc(message)}</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
          <p style="font-size:12px;color:#999">
            Sent from ENDEVOR website contact form
          </p>
        </div>
      `,
    });

    if (error) {
      throw new ApiError(
        "Failed to send email. Please try again later.",
        500
      );
    }

    return NextResponse.json<ContactResponse>(
      {
        success: true,
        data: {
          message: "Message received. We'll be in touch within 24 hours.",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json<ContactResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json<ContactResponse>(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    console.error("[POST /api/add]", error);

    return NextResponse.json<ContactResponse>(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

function esc(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!
  );
}
