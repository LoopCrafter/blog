import type { ZodError } from "zod";

export function zodToFieldErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "general";
    if (!errors[key]) errors[key] = issue.message;
  }

  return errors;
}
