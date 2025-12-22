import type { Config } from "../types/types";

/**
 * Main configuration object
 * Contains all application settings and constants
 */
export const config: Config = {
  // Language settings from localStorage or defaults
  // 'en' = English, 'uk' = Ukrainian
  defaultFromLang: localStorage.getItem("yst_from") || "en",
  defaultToLang: localStorage.getItem("yst_to") || "uk",

  // API rate limiting
  // Minimum time (in milliseconds) between translation requests
  minRequestInterval: 250,

  // Text constraints
  // Maximum length of text that can be translated in one request
  maxTextLength: 300,

  // UI settings
  // Duration (in milliseconds) before popup auto-removes
  popupDisplayDuration: 5000,
  // Vertical offset (in pixels) between cursor and popup
  popupOffsetY: 10,
  // Minimum margin (in pixels) from viewport edge
  popupMargin: 8,

  // CSS selectors and classes
  // YouTube's caption segment class name
  captionSelector: ".ytp-caption-segment",
  // Class added on hover for visual feedback
  hoverClass: "yt-translate-hover",
  // Main popup container class
  popupClass: "translation-popup",
  // Error state popup class
  popupErrorClass: "translation-popup-error",

  // API endpoint
  // MyMemory Translation API base URL
  apiUrl: "https://api.mymemory.translated.net/get",
};

/**
 * Update language preferences in both config and localStorage
 *  from - Source language code (e.g., 'en')
 *  to - Target language code (e.g., 'uk')
 */
export function updateLanguageConfig(from: string, to: string): void {
  // Update in-memory configuration
  config.defaultFromLang = from;
  config.defaultToLang = to;

  // Persist to localStorage for next session
  localStorage.setItem("yst_from", from);
  localStorage.setItem("yst_to", to);
}

/**
 * Get current language configuration
 * return - Object containing from and to language codes
 */
export function getLanguageConfig(): { from: string; to: string } {
  return {
    from: config.defaultFromLang,
    to: config.defaultToLang,
  };
}
