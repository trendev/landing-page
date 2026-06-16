import { ArrowRight, Target, X } from "lucide-react";

import { CALENDLY_URL } from "@/data/content";
import { Modal } from "./Modal";

interface ConsultationModalProps {
  onClose: () => void;
}

export function ConsultationModal({ onClose }: ConsultationModalProps) {
  return (
    <Modal onClose={onClose} panelClassName="max-w-2xl max-h-[85vh]">
      <div className="bg-accent/10 border-b border-border px-6 sm:px-8 py-6 sm:py-8 text-foreground relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
          <Target className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl sm:text-3xl mb-2 sm:mb-3">
          Let's Start Your Journey
        </h2>
        <p className="text-sm sm:text-base opacity-90">
          Ready to scale your business with resilience and consistency or launch
          a disruptive new venture?
        </p>
      </div>

      <div className="px-6 sm:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
            At TRENDev Consulting,{" "}
            <strong className="text-foreground">
              we provide a complimentary initial consultation
            </strong>{" "}
            via Google Meet to discuss your needs and explore how we can support
            your journey.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            During this free session, we'll dive deep into your technical
            challenges, strategic goals, and growth objectives. Whether you're
            looking to optimize your infrastructure, build a high-performing
            team, or develop cutting-edge solutions, we'll outline a clear path
            forward tailored to your unique situation.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              No commitment required - just an honest conversation about your
              goals
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Discuss your technical challenges and strategic objectives
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Get expert insights and actionable recommendations
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 font-medium"
          >
            Book Your Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </Modal>
  );
}
