import { serializeJsonLd } from "@/lib/structuredData";

/**
 * Inline structured data. Rendered in the page body (valid for JSON-LD) so it
 * lands in the prerendered HTML of exactly the route it describes, never in
 * index.html, which every route shares.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
