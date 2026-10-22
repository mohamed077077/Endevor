
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/components/Form/validation";
import type {
  ContactFormValues,
  ContactResponse,
} from "@/components/Form/types";

export const runtime = "nodejs";

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]!
  );
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

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

    const sender = getRequiredEnv("GMAIL_USER");
    const appPassword = getRequiredEnv("GMAIL_APP_PASSWORD").replace(/\s/g, "");
    const recipient = getRequiredEnv("CONTACT_EMAIL");

    const { name, email, budget, message } = validation.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: appPassword,
      },
    });

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2>New inquiry from the website</h2>

        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />

        <p><strong>Name:</strong> ${esc(name)}</p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${esc(email)}">${esc(email)}</a>
        </p>

        ${
          budget
            ? `<p><strong>Budget:</strong> ${esc(budget)}</p>`
            : ""
        }

        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${esc(message)}</p>

        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />

        <p style="font-size:12px;color:#999">
          Sent from ENDEVOR website contact form
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: {
        name: "ENDEVOR Website",
        address: sender,
      },
      to: recipient,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        "New inquiry from the ENDEVOR website",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Budget: ${budget || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html,
    });

    return NextResponse.json<ContactResponse>(
      {
        success: true,
        message: "Message received. We'll be in touch within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: "Invalid JSON payload.",
        },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      error.message.startsWith("Missing environment variable:")
    ) {
      console.error("[POST /api/add]", error.message);

      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    console.error("[POST /api/add]", error);

    return NextResponse.json<ContactResponse>(
      {
        success: false,
        message: "Failed to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
