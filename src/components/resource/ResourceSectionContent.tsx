"use client";

import type { ResourceSection, ResourceSectionContent } from "@/types/resource-content";

/** Renders section content based on backend response type. Add new types here when backend adds them. */
const CONTENT_RENDERERS: Record<
  string,
  (content: ResourceSectionContent) => React.ReactNode
> = {
  paragraphs: (content) => {
    if (!("paragraphs" in content) || !Array.isArray(content.paragraphs))
      return null;
    return (
      <div className="space-y-4">
        {content.paragraphs.map((para, j) => (
          <p key={j} className="text-slate-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    );
  },
  contact: (content) => {
    if (!("items" in content) || !Array.isArray(content.items)) return null;
    return (
      <ul className="space-y-3 mt-2">
        {content.items.map((item, j) => (
          <li key={j} className="text-slate-700">
            <span className="font-semibold text-slate-900">{item.label}</span>
            {" — "}
            {item.href ? (
              <a
                href={item.href}
                className="text-primary hover:underline"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.value}
              </a>
            ) : (
              <a href="tel:+18453424774" className="text-primary hover:underline">
                {item.value}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  },
};

function renderSectionContent(content: ResourceSectionContent): React.ReactNode {
  const type = content && typeof content === "object" && "type" in content ? content.type : "";
  const renderer = typeof type === "string" ? CONTENT_RENDERERS[type] : undefined;
  return renderer ? renderer(content) : null;
}

const HEADING_STYLES = {
  2: "text-2xl md:text-3xl font-bold text-[#002147] mb-4",
  3: "text-xl font-bold text-[#002147] mt-8 mb-3 first:mt-0",
  4: "text-lg font-bold text-slate-800 mt-6 mb-2 first:mt-0",
} as const;

export function ResourceSectionContent({ section }: { section: ResourceSection }) {
  const { heading, level, content } = section;
  const className = HEADING_STYLES[level] ?? HEADING_STYLES[2];
  const Tag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";

  return (
    <section>
      <Tag className={className}>{heading}</Tag>
      {renderSectionContent(content)}
    </section>
  );
}
