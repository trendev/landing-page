import { useState } from "react";

import { useRoute, type Route } from "@/app/router";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WeaveBackground } from "@/components/WeaveBackground";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { LandingPage } from "@/pages/LandingPage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ServicePage } from "@/pages/ServicePage";
import { TermsPage } from "@/pages/TermsPage";

function Page({
  route,
  onOpenConsultation,
}: {
  route: Route;
  onOpenConsultation: () => void;
}) {
  switch (route.kind) {
    case "landing":
      return <LandingPage onOpenConsultation={onOpenConsultation} />;
    case "service":
      return (
        <ServicePage
          slug={route.slug}
          onOpenConsultation={onOpenConsultation}
        />
      );
    case "terms":
      return <TermsPage date={route.date} />;
    case "legal":
      return <LegalPage />;
    case "privacy":
      return <PrivacyPage />;
    case "notFound":
      return <NotFoundPage />;
  }
}

export default function App() {
  const route = useRoute();
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const openConsultation = () => setShowConsultationModal(true);

  useBodyScrollLock(showConsultationModal);

  return (
    // Root stays transparent so the fixed, -z-10 WeaveBackground canvas shows
    // through; the body's bg-background (theme.css) is the fallback behind it.
    <div id="top" className="min-h-screen">
      <WeaveBackground />
      <Header onOpenConsultation={openConsultation} />

      <main>
        <Page route={route} onOpenConsultation={openConsultation} />
      </main>

      <Footer />

      {showConsultationModal && (
        <ConsultationModal onClose={() => setShowConsultationModal(false)} />
      )}
    </div>
  );
}
