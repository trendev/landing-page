import { Code } from "lucide-react";

import { GITHUB_URL, navLinks } from "@/data/content";
import { GithubIcon } from "./icons/GithubIcon";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            <span className="text-lg sm:text-xl">TRENDev</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
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
          <p className="text-sm sm:text-base">
            © 2026 TRENDev Consulting. High-end technical solutions for modern
            businesses.
          </p>
          <p className="text-sm mt-2 flex items-center justify-center gap-1">
            Built with love ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/julien-sie-jsie/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-all"
            >
              whyvrafvr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
