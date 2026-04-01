/**
 * Image URLs from middletownmedical.com urgent care pages (WordPress media).
 * Used with next/image — domains whitelisted in next.config.ts.
 */
export const URGENT_CARE_IMAGES = {
  /** Hero / page header band (locations & urgent care) */
  heroBackground:
    "https://middletownmedical.com/wp-content/uploads/2016/06/Staff-Directory-Locations-BG-black-tint.jpg",
  /** Facility / team photo used on legacy urgent care page */
  facilityPhoto:
    "https://middletownmedical.com/wp-content/uploads/2022/03/Photo30.jpg",
  /** Urgent care vs emergency room decision graphic */
  ucOrErDiagram:
    "https://middletownmedical.com/wp-content/uploads/2022/04/UC-or-ER.png",
  /** Category icons (2022 uploads) */
  icons: {
    illness:
      "https://middletownmedical.com/wp-content/uploads/2022/03/icons8-illness-64.png",
    injury:
      "https://middletownmedical.com/wp-content/uploads/2022/03/icons8-user-injured-64.png",
    hospital:
      "https://middletownmedical.com/wp-content/uploads/2022/03/hospital-1.png",
    laboratory:
      "https://middletownmedical.com/wp-content/uploads/2022/03/beaker-2-e1647987295798.png",
    pediatrics:
      "https://middletownmedical.com/wp-content/uploads/2022/04/pediatrics.png",
    stdTesting:
      "https://middletownmedical.com/wp-content/uploads/2022/04/std-testing.png",
    medical:
      "https://middletownmedical.com/wp-content/uploads/2022/04/icons8-medical-68.png",
    xray: "https://middletownmedical.com/wp-content/uploads/2022/03/icons8-x-ray-100-e1647986811455.png",
    syringe:
      "https://middletownmedical.com/wp-content/uploads/2022/03/syringe-1-e1647986713408.png",
    clock:
      "https://middletownmedical.com/wp-content/uploads/2022/03/clock-2.png",
  },
} as const;

export const MM_INSURANCE_INFO_URL =
  "https://middletownmedical.com/insurances-we-accept/";
