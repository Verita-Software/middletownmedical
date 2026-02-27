export function getInitials(name: string) {
  if (!name) return "";
  const cleanName = name.replace(
    /,\s*(M\.?D\.?|D\.?O\.?|P\.?A\.?-?C|F\.?N\.?P\.?|M\.?S\.?N\.?|F\.?N\.?P\.?-?B\.?C\.?|C\.?D\.?N\.?)\b/gi,
    "",
  );
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0][0] || "";
    const last = parts[parts.length - 1][0] || "";
    return (first + last).toUpperCase().replace(/[^A-Z]/g, "");
  }
  return name
    .substring(0, 2)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}
