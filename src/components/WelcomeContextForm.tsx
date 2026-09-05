import { useState } from "react";
import { ArrowRight, Check, Copy, TriangleAlert } from "lucide-react";

import {
  CONTEXT_EMAIL_HREF,
  CONTEXT_EMAIL_SUBJECT,
  CONTEXT_MAILTO_LIMIT,
  buildContextMailto,
  buildContextMessage,
  contextFields,
  contextForm,
} from "@/data/welcome";
import { CONTACT_ADDRESS } from "@/data/content";

const FIELD_ID_PREFIX = "welcome-context";
const STATUS_ID = `${FIELD_ID_PREFIX}-status`;

type CopyState = "idle" | "copied" | "failed";

/**
 * The guided version of the onboarding email on /welcome.
 *
 * The client answers the eight topics in the page and the submit button hands
 * the composed message to their own mail client. Deliberately still a mailto:
 * nothing is posted anywhere, no answer is stored, and no third-party
 * processor is involved — which is what keeps /privacy accurate without a
 * word of change. Draft persistence was considered and left out for the same
 * reason: /privacy documents exactly one storage key.
 */
export function WelcomeContextForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const hasAnswer = contextFields.some((field) => answers[field.id]?.trim());
  const href = buildContextMailto(answers, name);
  // Measured on the encoded href, because that is what actually gets handed
  // to the OS — prose with accents or newlines encodes far longer than it reads.
  const tooLong = href.length > CONTEXT_MAILTO_LIMIT;
  const canSubmit = hasAnswer && !tooLong;

  const setAnswer = (id: string, value: string) => {
    setAnswers((previous) => ({ ...previous, [id]: value }));
    setCopyState("idle");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    // Same tab: opening a blank tab for a mail client leaves an empty window
    // behind on most browsers.
    window.location.href = href;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildContextMessage(answers, name));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const fieldClass =
    "glass w-full rounded-xl px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/60";

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-5">
      {contextFields.map((field) => {
        const inputId = `${FIELD_ID_PREFIX}-${field.id}`;
        const hintId = `${inputId}-hint`;
        return (
          <div key={field.id}>
            <label
              htmlFor={inputId}
              className="block text-sm sm:text-base text-foreground mb-1.5"
            >
              {field.label}
            </label>
            {/* The hint stays put while they type; the placeholder is the
                worked example and vanishes on the first keystroke. Neither
                replaces the label — see FaqSearch: a placeholder is not one. */}
            <p id={hintId} className="text-sm text-muted-foreground mb-2">
              {field.hint}
            </p>
            <textarea
              id={inputId}
              rows={3}
              value={answers[field.id] ?? ""}
              onChange={(event) => setAnswer(field.id, event.target.value)}
              placeholder={`${contextForm.examplePrefix}${field.placeholder}`}
              aria-describedby={hintId}
              className={`${fieldClass} resize-y`}
            />
          </div>
        );
      })}

      <div>
        <label
          htmlFor={`${FIELD_ID_PREFIX}-name`}
          className="block text-sm sm:text-base text-foreground mb-1.5"
        >
          {contextForm.nameLabel}
        </label>
        <p
          id={`${FIELD_ID_PREFIX}-name-hint`}
          className="text-sm text-muted-foreground mb-2"
        >
          {contextForm.nameHint}
        </p>
        <input
          id={`${FIELD_ID_PREFIX}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setCopyState("idle");
          }}
          aria-describedby={`${FIELD_ID_PREFIX}-name-hint`}
          className={fieldClass}
        />
      </div>

      {tooLong && (
        <p className="flex items-start gap-2.5 text-sm text-foreground">
          <TriangleAlert
            aria-hidden="true"
            className="w-4 h-4 mt-0.5 text-accent shrink-0"
          />
          <span>
            {contextForm.tooLongWarning} Send it to {CONTACT_ADDRESS} under the
            subject &ldquo;{CONTEXT_EMAIL_SUBJECT}&rdquo;.
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          aria-describedby={STATUS_ID}
          className="px-5 py-2.5 sm:py-3 rounded-lg inline-flex items-center justify-center gap-2 text-sm sm:text-base bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {contextForm.submitLabel}
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </button>

        {tooLong && (
          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 sm:py-3 rounded-lg inline-flex items-center justify-center gap-2 text-sm sm:text-base glass hover:bg-white/10 transition-colors"
          >
            {copyState === "copied" ? (
              <Check aria-hidden="true" className="w-4 h-4" />
            ) : (
              <Copy aria-hidden="true" className="w-4 h-4" />
            )}
            {copyState === "copied"
              ? contextForm.copiedLabel
              : contextForm.copyLabel}
          </button>
        )}
      </div>

      <p id={STATUS_ID} aria-live="polite" className="text-sm text-muted-foreground">
        {copyState === "failed"
          ? contextForm.copyFailedLabel
          : hasAnswer
            ? contextForm.submitHint
            : contextForm.emptyHint}
      </p>

      <p className="text-sm">
        <a
          href={CONTEXT_EMAIL_HREF}
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          {contextForm.blankTemplateLabel}
        </a>
      </p>
    </form>
  );
}
