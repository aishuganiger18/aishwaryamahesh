import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { generateBio, type BioLength, type BioVoice } from "@/lib/bio.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bio Studio — Draft your portfolio bio with AI" },
      {
        name: "description",
        content:
          "Provide your skills, experience and preferred writing tone, and get a polished portfolio bio drafted with AI.",
      },
      {
        property: "og:title",
        content: "Bio Studio — Draft your portfolio bio with AI",
      },
      {
        property: "og:description",
        content:
          "Turn your skills and experience into a polished portfolio bio in one click.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TONES = [
  "Professional",
  "Warm & friendly",
  "Bold & confident",
  "Minimal & crisp",
  "Conversational",
] as const;

const LENGTHS: { key: BioLength; label: string; hint: string }[] = [
  { key: "short", label: "Short", hint: "2–3 sentences" },
  { key: "medium", label: "Standard", hint: "one paragraph" },
  { key: "detailed", label: "Detailed", hint: "two paragraphs" },
];

const VOICES: { key: BioVoice; label: string }[] = [
  { key: "first", label: "First person" },
  { key: "third", label: "Third person" },
];

type FormState = {
  name: string;
  role: string;
  skills: string;
  experience: string;
};

function Index() {
  const runGenerate = useServerFn(generateBio);

  const [form, setForm] = useState<FormState>({
    name: "",
    role: "",
    skills: "",
    experience: "",
  });
  const [tone, setTone] = useState<string>(TONES[0]);
  const [length, setLength] = useState<BioLength>("medium");
  const [voice, setVoice] = useState<BioVoice>("first");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleGenerate() {
    if (!form.skills.trim() || !form.experience.trim()) {
      setError(
        "Add at least your skills and a few lines of experience so the draft has something to work with.",
      );
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    setBio("");
    setCopied(false);
    try {
      const result = await runGenerate({
        data: {
          name: form.name.trim(),
          role: form.role.trim(),
          skills: form.skills,
          experience: form.experience,
          tone,
          length,
          voice,
        },
      });
      setBio(result.bio);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while drafting your bio. Please try again.",
      );
      setStatus("error");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copying failed — select the bio text and copy it manually.");
    }
  }

  const wordCount = bio.split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Bio Studio
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            A polished portfolio bio, drafted for you
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Share your skills, experience and the tone you prefer — the AI
            drafts a clean, ready-to-paste bio you can refine and reuse.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              About you
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Only what you enter here is used. Nothing is invented.
            </p>

            <div className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">
                    Name{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="name"
                    className="field-input"
                    placeholder="e.g. Aishu Ganiger"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="role">
                    Role or title{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="role"
                    className="field-input"
                    placeholder="e.g. Frontend developer"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="skills">
                  Skills
                </label>
                <textarea
                  id="skills"
                  className="field-input min-h-24 resize-y"
                  placeholder="React, TypeScript, UI design, mentoring juniors…"
                  value={form.skills}
                  onChange={(e) => update("skills", e.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="experience">
                  Experience
                </label>
                <textarea
                  id="experience"
                  className="field-input min-h-32 resize-y"
                  placeholder="Where you've worked, what you've built, years of experience, proudest projects…"
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                />
              </div>

              <div>
                <span className="field-label">Preferred tone</span>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      aria-pressed={tone === t}
                      className={`chip ${tone === t ? "chip-active" : "chip-idle"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="field-label">Length</span>
                  <div className="flex flex-wrap gap-2">
                    {LENGTHS.map((l) => (
                      <button
                        key={l.key}
                        type="button"
                        onClick={() => setLength(l.key)}
                        title={l.hint}
                        aria-pressed={length === l.key}
                        className={`chip ${length === l.key ? "chip-active" : "chip-idle"}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="field-label">Voice</span>
                  <div className="flex flex-wrap gap-2">
                    {VOICES.map((v) => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setVoice(v.key)}
                        aria-pressed={voice === v.key}
                        className={`chip ${voice === v.key ? "chip-active" : "chip-idle"}`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {status === "error" && error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading"}
                className="btn-primary w-full"
              >
                {status === "loading" ? "Drafting your bio…" : "Draft my bio"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:sticky lg:top-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Your draft
              </h2>
              {status === "done" && bio ? (
                <span className="text-xs text-muted-foreground">
                  {wordCount} words
                </span>
              ) : null}
            </div>

            {status === "loading" ? (
              <div className="mt-6 space-y-3" aria-live="polite">
                <p className="text-sm text-muted-foreground">
                  Drafting your bio… this usually takes a few seconds.
                </p>
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            ) : status === "done" && bio ? (
              <>
                <p className="mt-6 font-display text-lg leading-relaxed text-foreground">
                  {bio}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn-primary"
                  >
                    {copied ? "Copied!" : "Copy bio"}
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="btn-ghost"
                  >
                    Regenerate
                  </button>
                </div>
              </>
            ) : status === "error" && error && !form.skills.trim() ? (
              <p className="mt-6 text-sm text-muted-foreground">{error}</p>
            ) : status === "error" && error ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Fix the details on the left and try again — your inputs are
                still here.
              </p>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Your generated bio will appear here. Pick a tone, length and
                voice, then press{" "}
                <span className="font-medium text-foreground">
                  Draft my bio
                </span>
                .
              </p>
            )}
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Drafts are generated fresh each time — regenerate as often as you like
          until the voice sounds right.
        </p>
      </div>
    </div>
  );
}
