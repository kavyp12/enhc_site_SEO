// src/app/components/JsonLd.tsx
// Renders a single JSON-LD <script>. Pass one schema.org node or an array of
// nodes (arrays are wrapped in an @graph). Nodes should NOT include @context —
// it is added here so every emitter stays consistent.
type Node = Record<string, unknown>;

export default function JsonLd({ data }: { data: Node | Node[] }) {
  const json = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
