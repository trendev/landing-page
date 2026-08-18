import { Code } from "lucide-react";

import { Link } from "@/app/router";
import { GITHUB_URL, legalLinks, navLinks } from "@/data/content";
import { GithubIcon } from "./icons/GithubIcon";

interface FooterProps {
  onOpenCookieSettings: () => void;
}

export function Footer({ onOpenCookieSettings }: FooterProps) {
  return (
    <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6 print:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            <span className="text-lg sm:text-xl">TRENDev</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="text-center text-muted-foreground border-t border-border pt-6 sm:pt-8">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm mb-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={onOpenCookieSettings}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie settings
            </button>
          </nav>
          <p className="text-sm sm:text-base">
            © 2026 TRENDev Consulting. High-end technical solutions for modern
            businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
