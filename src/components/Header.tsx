import { Code } from "lucide-react";

import { navLinks } from "@/data/content";

interface HeaderProps {
  onOpenConsultation: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 glass border-x-0 border-t-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-1.5">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            <span className="text-lg sm:text-xl">TRENDev</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onOpenConsultation}
          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          Free Consultation
        </button>
      </div>
    </header>
  );
}
