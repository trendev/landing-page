import { Link } from "@/app/router";
import type { ConsentChoice } from "@/lib/analytics";

interface ConsentBannerProps {
  /**
   * True when the visitor already made a choice and reopened the banner from
   * the footer. Only then is dismissing without deciding offered: on a first
   * visit there is no implicit consent, so the only ways out are accept and
   * refuse.
   */
  reopened: boolean;
  onDecide: (choice: ConsentChoice) => void;
  onDismiss: () => void;
}

// Accept and refuse are the same size and sit side by side: refusing has to be
// as easy as accepting (CNIL). Fixed chrome overlapping scrolling content is
// one of the few places the perf budget allows a real backdrop-blur.
const buttonClass =
  "px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors";

export function ConsentBanner({
  reopened,
  onDecide,
  onDismiss,
}: ConsentBannerProps) {
  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 print:hidden"
    >
      <div className="glass backdrop-blur-md rounded-xl max-w-3xl mx-auto px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-muted-foreground flex-1">
          We use Google Analytics cookies to measure how this site is used.
          Nothing is loaded or stored unless you accept.{" "}
          <Link
            href="/privacy"
            className="text-accent hover:opacity-80 transition-opacity"
          >
            Privacy policy
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {reopened && (
            <button
              onClick={onDismiss}
              className="px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onDecide("denied")}
            className={`${buttonClass} border border-border text-foreground hover:bg-white/10`}
          >
            Refuse
          </button>
          <button
            onClick={() => onDecide("granted")}
            className={`${buttonClass} bg-accent text-accent-foreground hover:opacity-90`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
