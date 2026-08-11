import { useState } from "react";

import { Cta } from "@/components/Cta";
import { EngagementModels } from "@/components/EngagementModels";
import { Expertise } from "@/components/Expertise";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Methodology } from "@/components/Methodology";
import { Offers } from "@/components/Offers";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { Technologies } from "@/components/Technologies";
import { WhyChoose } from "@/components/WhyChoose";
import { DetailModal } from "@/components/modals/DetailModal";
import { ProjectsModal } from "@/components/modals/ProjectsModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import type { ServiceItem } from "@/types";

interface LandingPageProps {
  onOpenConsultation: () => void;
}

export function LandingPage({ onOpenConsultation }: LandingPageProps) {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  // Restores the index.html defaults (title/description/canonical).
  useDocumentMeta();
  useBodyScrollLock(Boolean(selectedItem) || showProjectsModal);

  return (
    <>
      <Hero
        onOpenConsultation={onOpenConsultation}
        onOpenProjects={() => setShowProjectsModal(true)}
      />
      <Methodology />
      <Pricing onOpenConsultation={onOpenConsultation} />
      <Offers onOpenConsultation={onOpenConsultation} />
      <EngagementModels />
      <WhyChoose />
      <Expertise onSelectItem={setSelectedItem} />
      <Services onSelectItem={setSelectedItem} />
      <Technologies />
      <Faq />
      <Cta />

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onGetStarted={() => {
            setSelectedItem(null);
            onOpenConsultation();
          }}
        />
      )}

      {showProjectsModal && (
        <ProjectsModal onClose={() => setShowProjectsModal(false)} />
      )}
    </>
  );
}
