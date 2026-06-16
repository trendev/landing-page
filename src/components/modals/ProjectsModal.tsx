import { ArrowRight, Rocket, X } from "lucide-react";

import { projects } from "@/data/content";
import { Modal } from "./Modal";

interface ProjectsModalProps {
  onClose: () => void;
}

export function ProjectsModal({ onClose }: ProjectsModalProps) {
  const visibleProjects = projects.filter((p) => !p.hidden);

  return (
    <Modal onClose={onClose} panelClassName="max-w-4xl max-h-[85vh]">
      <div className="bg-accent/10 border-b border-border px-6 sm:px-8 py-6 sm:py-8 text-foreground relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
          <Rocket className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl sm:text-3xl mb-2 sm:mb-3">Our Recent Projects</h2>
        <p className="text-sm sm:text-base opacity-90">
          Explore our latest open-source initiatives and join us in shaping the
          future of technology
        </p>
      </div>

      <div className="px-6 sm:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="group border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-[border-color,box-shadow,color] duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl mb-1 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  {project.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base mb-2 italic text-muted-foreground">
                {project.tagline}
              </p>

              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <ArrowRight className="w-4 h-4" />
                Visit Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
