import { useEffect, useState } from "react";

import { useRoute, type Route } from "@/app/router";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WeaveBackground } from "@/components/WeaveBackground";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { readConsent, setConsent } from "@/lib/analytics";
import { AdvisoryPage } from "@/pages/AdvisoryPage";
import { FaqPage } from "@/pages/FaqPage";
import { LandingPage } from "@/pages/LandingPage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ServicePage } from "@/pages/ServicePage";
import { TermsPage } from "@/pages/TermsPage";
import { WelcomePage } from "@/pages/WelcomePage";

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
    case "advisory":
      return <AdvisoryPage onOpenConsultation={onOpenConsultation} />;
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
    case "faq":
      return <FaqPage onOpenConsultation={onOpenConsultation} />;
    case "welcome":
      return <WelcomePage />;
    case "notFound":
      return <NotFoundPage />;
  }
}

export default function App() {
  const route = useRoute();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  // Shown until the visitor answers it, and reopened from the footer so the
  // choice can be changed or withdrawn at any time. Opened after mount rather
  // than from the initial state: the prerendered HTML cannot know this
  // visitor's stored choice, and hydration must start from the same tree.
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  useEffect(() => {
    if (readConsent() === null) setShowConsentBanner(true);
  }, []);

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

      <Footer onOpenCookieSettings={() => setShowConsentBanner(true)} />

      {showConsentBanner && (
        <ConsentBanner
          reopened={readConsent() !== null}
          onDecide={(choice) => {
            setConsent(choice);
            setShowConsentBanner(false);
          }}
          onDismiss={() => setShowConsentBanner(false)}
        />
      )}

      {showConsultationModal && (
        <ConsultationModal onClose={() => setShowConsultationModal(false)} />
      )}
    </div>
  );
}
