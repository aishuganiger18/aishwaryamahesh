import { createServerFn } from "@tanstack/react-start";

export type BioLength = "short" | "medium" | "detailed";
export type BioVoice = "first" | "third";

export interface BioInput {
  name?: string;
  role?: string;
  skills: string;
  experience: string;
  tone: string;
  length: BioLength;
  voice: BioVoice;
}

export interface BioResult {
  bio: string;
}

const LENGTH_HINTS: Record<BioLength, string> = {
  short: "2 to 3 tight sentences (about 50 words).",
  medium: "one solid paragraph (about 90 to 130 words).",
  detailed: "two short paragraphs (about 180 to 230 words).",
};

/**
 * Drafts a polished portfolio bio with Lovable AI Gateway (Responses surface,
 * openai/gpt-6-astra). The SDK is imported inside the handler so it never
 * enters the client bundle: *.functions.ts modules ship top-level imports.
 */
export const generateBio = createServerFn({ method: "POST" })
  .inputValidator((input: BioInput): BioInput => input)
  .handler(async ({ data }): Promise<BioResult> => {
    const { generateResponse, GatewayError } = await import(
      "@lovable.dev/ai-gateway"
    );

    const voice = data.voice === "third" ? "third person" : "first person";
    const name = data.name?.trim() ?? "";
    const role = data.role?.trim() ?? "";

    const instructions = [
      "You are a senior copywriter who writes portfolio bios for professionals.",
      "Write a polished portfolio bio from the candidate details provided.",
      `Write in ${voice}.`,
      `Length: ${LENGTH_HINTS[data.length]}`,
      `Tone: ${data.tone}.`,
      "Rules:",
      "- Plain prose only: no markdown, no headings, no bullet points, and do not wrap the bio in quotation marks.",
      "- Use only the facts provided. You may smooth grammar and phrasing, but never invent employers, dates, numbers, certifications or achievements.",
      "- Lead with who the person is and the value they bring; weave the listed skills naturally into sentences instead of listing them.",
      name
        ? `- The candidate's name is ${name}; use it naturally at most once or twice.`
        : "- No name was provided, so write it generically without a placeholder name.",
      role
        ? `- Their role or title: ${role}.`
        : "- No role was provided; infer nothing beyond what is given.",
      "Return only the finished bio text.",
    ].join("\n");

    const input = [
      "Candidate details for the portfolio bio:",
      `Skills: ${data.skills.trim()}`,
      `Experience: ${data.experience.trim()}`,
    ].join("\n");

    try {
      const result = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions,
        input,
      });

      const bio = (result.output ?? [])
        .filter(
          (item): item is Extract<typeof item, { type: "message" }> =>
            item.type === "message",
        )
        .flatMap((item) => item.content)
        .filter(
          (part): part is Extract<typeof part, { type: "output_text" }> =>
            part.type === "output_text",
        )
        .map((part) => part.text)
        .join("")
        .trim();

      if (!bio) {
        throw new Error(
          "The model returned an empty draft. Please try generating again.",
        );
      }
      return { bio };
    } catch (error) {
      if (error instanceof GatewayError) {
        throw new Error(
          `The AI draft didn't go through (${error.code ?? "gateway error"}). Check the AI credits for this workspace and try again.`,
        );
      }
      throw error;
    }
  });
