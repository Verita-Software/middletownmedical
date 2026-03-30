/**
 * Patient contact field validation (US-centric) for booking / registration flows.
 * Pure functions — easy to unit test and reuse on client or server.
 */

export type ContactFormSlice = {
  phone: string;
  email: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  zip: string;
};

export type ContactFieldKey = keyof ContactFormSlice;

export type ContactFieldErrors = Partial<Record<ContactFieldKey, string>>;

/** Digits only for phone checks. */
export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * US phone: 10 digits, or 11 with leading country code 1.
 * Accepts formatted input; validates the underlying number.
 */
export function validatePhone(value: string): string | undefined {
  const raw = value.trim();
  if (!raw) return "Phone number is required.";

  let digits = normalizePhoneDigits(raw);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  if (digits.length !== 10) {
    return "Enter a valid 10-digit US phone number.";
  }
  // NANP: area code and exchange cannot start with 0 or 1 (simplified check)
  const area = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  if (/^[01]/.test(area) || /^[01]/.test(exchange)) {
    return "That phone number doesn’t look valid. Check the area code.";
  }
  return undefined;
}

const EMAIL_MAX = 254;
// Practical pattern: local@domain.tld (not full RFC 5322 — good for UX forms)
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email address is required.";
  if (v.length > EMAIL_MAX) return `Email must be ${EMAIL_MAX} characters or fewer.`;
  if (!EMAIL_PATTERN.test(v)) return "Enter a valid email address.";
  return undefined;
}

const ADDRESS_MIN = 5;
const ADDRESS_MAX = 200;

export function validateAddress(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Street address is required.";
  if (v.length < ADDRESS_MIN) {
    return `Use at least ${ADDRESS_MIN} characters for the street address.`;
  }
  if (v.length > ADDRESS_MAX) {
    return `Street address must be ${ADDRESS_MAX} characters or fewer.`;
  }
  return undefined;
}

const APT_MAX = 50;

/** Optional: length + safe characters only when non-empty. */
export function validateAptSuite(value: string): string | undefined {
  const v = value.trim();
  if (!v) return undefined;
  if (v.length > APT_MAX) {
    return `Apt / suite must be ${APT_MAX} characters or fewer.`;
  }
  if (!/^[\w\s#.,\-/]+$/u.test(v)) {
    return "Use letters, numbers, and common punctuation only.";
  }
  return undefined;
}

const CITY_MIN = 2;
const CITY_MAX = 100;

export function validateCity(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "City is required.";
  if (v.length < CITY_MIN) return "City name is too short.";
  if (v.length > CITY_MAX) return `City must be ${CITY_MAX} characters or fewer.`;
  // Letters, numbers (e.g. "24 de Julio"), spaces, and common punctuation in city names
  if (!/^[\p{L}\p{N}\s'.,\-/#&()]+$/u.test(v)) {
    return "City contains invalid characters.";
  }
  return undefined;
}

const STATE_FULL_MIN = 3;
const STATE_FULL_MAX = 50;

/**
 * US: 2-letter abbreviation (case-insensitive) or full state / territory name.
 */
export function validateState(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "State is required.";

  if (v.length === 2) {
    if (!/^[A-Za-z]{2}$/.test(v)) {
      return "Use two letters for the state (e.g. NY).";
    }
    return undefined;
  }

  if (v.length < STATE_FULL_MIN || v.length > STATE_FULL_MAX) {
    return "Enter a valid state name or 2-letter code.";
  }
  if (!/^[a-zA-Z][a-zA-Z\s'.-]*$/.test(v)) {
    return "State may only contain letters, spaces, hyphens, apostrophes, and periods.";
  }
  return undefined;
}

/**
 * US ZIP: 5 digits or ZIP+4.
 */
export function validateZip(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "ZIP code is required.";
  if (!/^\d{5}(-\d{4})?$/.test(v)) {
    return "Use a valid ZIP code (12345 or 12345-6789).";
  }
  return undefined;
}

/** Single-field validation (blur / programmatic). */
export function validateContactField(
  key: ContactFieldKey,
  value: string
): string | undefined {
  switch (key) {
    case "phone":
      return validatePhone(value);
    case "email":
      return validateEmail(value);
    case "address":
      return validateAddress(value);
    case "aptSuite":
      return validateAptSuite(value);
    case "city":
      return validateCity(value);
    case "state":
      return validateState(value);
    case "zip":
      return validateZip(value);
    default:
      return undefined;
  }
}

export function validateContactFields(form: ContactFormSlice): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  (Object.keys(form) as ContactFieldKey[]).forEach((key) => {
    const msg = validateContactField(key, form[key]);
    if (msg) errors[key] = msg;
  });

  return errors;
}

export function hasContactErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
