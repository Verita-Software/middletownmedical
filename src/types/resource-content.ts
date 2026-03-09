/**
 * Backend response contract for resource page content.
 * UI renders from this shape; do not hardcode content structure in components.
 */

export type ResourceSectionContent =
  | { type: "paragraphs"; paragraphs: string[] }
  | {
      type: "contact";
      items: { label: string; value: string; href?: string }[];
    }
  | Record<string, unknown>;

export interface ResourceSection {
  heading: string;
  level: 2 | 3 | 4;
  content: ResourceSectionContent;
}

export interface ResourceResponse {
  title: string;
  subtitle?: string;
  intro: string;
  sections: ResourceSection[];
}

export type ResourceContentMap = Record<string, ResourceResponse>;
