export type Lang = "en" | "pl" | "ua";

export function detectBrowserLanguage(): Lang {
  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferredLanguage = languages.find(Boolean)?.toLowerCase() ?? "en";

  if (preferredLanguage.startsWith("pl")) return "pl";
  if (preferredLanguage.startsWith("uk") || preferredLanguage.startsWith("ua")) return "ua";

  return "en";
}
