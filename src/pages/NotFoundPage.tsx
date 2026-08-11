import { ArrowLeft } from "lucide-react";

import { Link } from "@/app/router";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function NotFoundPage() {
  useDocumentMeta({ title: "Page not found | TRENDev" });

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has moved.
          </p>
          <Link
            href="/"
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
