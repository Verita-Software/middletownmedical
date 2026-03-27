/**
 * Injects a JSON-LD <script> tag for structured data (schema.org).
 * Use inside any Server Component page to add rich result eligibility.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
