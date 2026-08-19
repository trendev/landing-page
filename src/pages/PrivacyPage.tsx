import { LEGAL_LAST_UPDATED, privacySections } from "@/data/legalPages";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ContentSections, LegalPageLayout } from "@/pages/legalLayout";

export function PrivacyPage() {
  useDocumentMeta({
    title: "Privacy Policy | TRENDev",
    description:
      "How TRENDev Consulting processes personal data on trendev.fr: analytics, consultation booking, contact and (upcoming) subscription billing.",
    canonicalPath: "/privacy",
  });

  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LEGAL_LAST_UPDATED}>
      <ContentSections sections={privacySections} />
    </LegalPageLayout>
  );
}
