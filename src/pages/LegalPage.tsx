import { LEGAL_LAST_UPDATED, legalNoticeSections } from "@/data/legalPages";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ContentSections, LegalPageLayout } from "@/pages/legalLayout";

export function LegalPage() {
  useDocumentMeta({
    title: "Legal Notice | TRENDev",
    description:
      "Legal notice (mentions légales) of the TRENDev Consulting website.",
    canonicalPath: "/legal",
  });

  return (
    <LegalPageLayout
      title="Legal Notice"
      subtitle="Mentions légales"
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <ContentSections sections={legalNoticeSections} />
    </LegalPageLayout>
  );
}
