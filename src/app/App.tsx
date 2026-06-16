import { useState } from "react";

import { Cta } from "@/components/Cta";
import { EngagementModels } from "@/components/EngagementModels";
import { Expertise } from "@/components/Expertise";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Technologies } from "@/components/Technologies";
import { WeaveBackground } from "@/components/WeaveBackground";
import { WhyChoose } from "@/components/WhyChoose";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { DetailModal } from "@/components/modals/DetailModal";
import { ProjectsModal } from "@/components/modals/ProjectsModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { ServiceItem } from "@/types";

export default function App() {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  const openConsultation = () => setShowConsultationModal(true);

  useBodyScrollLock(
    Boolean(selectedItem) || showConsultationModal || showProjectsModal,
  );

  return (
    <div id="top" className="min-h-screen">
      <WeaveBackground />
      <Header onOpenConsultation={openConsultation} />

      <main>
        <Hero
          onOpenConsultation={openConsultation}
          onOpenProjects={() => setShowProjectsModal(true)}
        />
        <EngagementModels />
        <WhyChoose />
        <Expertise onSelectItem={setSelectedItem} />
        <Services onSelectItem={setSelectedItem} />
        <Technologies />
        <Faq />
        <Cta />
      </main>

      <Footer />

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onGetStarted={() => {
            setSelectedItem(null);
            openConsultation();
          }}
        />
      )}

      {showConsultationModal && (
        <ConsultationModal onClose={() => setShowConsultationModal(false)} />
      )}

      {showProjectsModal && (
        <ProjectsModal onClose={() => setShowProjectsModal(false)} />
      )}
    </div>
  );
}
