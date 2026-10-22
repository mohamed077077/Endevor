
"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLang } from "../LanguageProvider";
import { contactSchema } from "./validation";
import type { ContactFormValues, ContactResponse } from "./types";

/* ─── Props ───────────────────────────────────────────────── */
interface ContactFormProps {
  onSuccess: () => void;
  firstFieldRef?: React.Ref<HTMLInputElement>;
}

/* ─── Form ────────────────────────────────────────────────── */
export function ContactForm({
  onSuccess,
  firstFieldRef,
}: ContactFormProps) {
  const { t, lang } = useLang();
  const f = t.form;
  const isRtl = lang === "ar";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: "",
      message: "",
    },
  });

  /* ─── Mutation ──────────────────────────────────────────── */
  const mutation = useMutation({
    mutationFn: async (
      values: ContactFormValues
    ): Promise<ContactResponse> => {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to send your message."
        );
      }

      return result;
    },

    onSuccess: () => {
      reset();
      onSuccess();
    },
  });

  /* ─── Submit ────────────────────────────────────────────── */
  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  /* ─── Shared input styling ──────────────────────────────── */
  const inputBase = [
    "w-full border bg-transparent px-4 py-2.5 text-sm text-ink outline-none",
    "placeholder:text-soft/60",
    "transition focus:border-ink",
  ].join(" ");

  const inputCls = (hasError: boolean) =>
    `${inputBase} ${hasError ? "border-red-400" : "border-line"}`;

  /* ─── Name ref ──────────────────────────────────────────── */
  const { ref: nameRegRef, ...nameRest } = register("name");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 px-6 py-6"
    >
      <p className="text-sm text-soft">{f.subtitle}</p>

      {/* Name */}
      <Field id="fd-name" label={f.name} error={errors.name?.message}>
        <input
          {...nameRest}
          ref={(el) => {
            nameRegRef(el);

            if (typeof firstFieldRef === "function") {
              firstFieldRef(el);
            } else if (firstFieldRef) {
              firstFieldRef.current = el;
            }
          }}
          id="fd-name"
          type="text"
          autoComplete="name"
          placeholder={f.namePlaceholder}
          aria-invalid={!!errors.name}
          className={inputCls(!!errors.name)}
        />
      </Field>

      {/* Email */}
      <Field id="fd-email" label={f.email} error={errors.email?.message}>
        <input
          {...register("email")}
          id="fd-email"
          type="email"
          autoComplete="email"
          placeholder={f.emailPlaceholder}
          aria-invalid={!!errors.email}
          className={inputCls(!!errors.email)}
        />
      </Field>

      {/* Budget (optional) */}
      <Field id="fd-budget" label={f.budget}>
        <input
          {...register("budget")}
          id="fd-budget"
          type="text"
          placeholder={f.budgetPlaceholder}
          className={inputCls(false)}
        />
      </Field>

      {/* Message */}
      <Field
        id="fd-message"
        label={f.message}
        error={errors.message?.message}
      >
        <textarea
          {...register("message")}
          id="fd-message"
          rows={4}
          placeholder={f.messagePlaceholder}
          aria-invalid={!!errors.message}
          className={`${inputCls(!!errors.message)} resize-none`}
        />
      </Field>

      {/* Server error */}
      {mutation.isError && (
        <p role="alert" className="text-sm text-red-500">
          {mutation.error.message || f.errorText}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => reset()}
          className="label h-11 px-5 text-soft transition hover:text-ink"
        >
          {isRtl ? "إلغاء" : "Cancel"}
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="label inline-flex h-11 items-center gap-2 bg-ink px-7 text-paper transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? f.sending : f.submit}
        </button>
      </div>
    </form>
  );
}

/* ─── Field wrapper ───────────────────────────────────────── */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label text-sm text-ink">
        {label}
      </label>

      {children}

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
