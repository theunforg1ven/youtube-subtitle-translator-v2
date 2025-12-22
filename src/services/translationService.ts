/**
 * Translation Service
 * Handles API calls with rate limiting and error handling
 * Integrates with cache for optimal performance
 */

import { config } from "../config/settings";
import { translationCache } from "../core/cache";
import type { TranslationResponse, ValidationResult } from "../types/types.ts";

/**
 * Get translation with caching and rate limiting
 * Main translation function - checks cache first, then makes API call
 *  text - Text to translate
 *  from - Source language code (defaults to config)
 *  to - Target language code (defaults to config)
 * return - Promise resolving to translated text
 */
export async function getTranslation(
  text: string,
  from: string = config.defaultFromLang,
  to: string = config.defaultToLang
): Promise<string> {
  // Generate unique cache key for this translation
  const cacheKey = translationCache.generateKey(text, from, to);

  // LAYER 1: Check cache for existing translation
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (cached) return cached;
  }

  // LAYER 2: Check if request already in progress
  if (translationCache.hasInflight(cacheKey)) {
    const inflight = translationCache.getInflight(cacheKey);
    if (inflight) return inflight;
  }

  // LAYER 3: Calculate rate limit delay
  const now = Date.now();
  const lastRequest = translationCache.getLastRequestTime();
  const timeSinceLastRequest = now - lastRequest;

  // Wait time to maintain minimum interval between requests
  const wait = Math.max(0, config.minRequestInterval - timeSinceLastRequest);

  // LAYER 4: Create promise with rate limiting
  const promise = new Promise<string>((resolve, reject) => {
    // Use setTimeout to enforce rate limit
    setTimeout(async () => {
      try {
        // Update timestamp before making request
        translationCache.updateLastRequestTime();

        // Make actual API call
        const result = await fetchTranslation(text, from, to);

        // Store result in cache for future use
        translationCache.set(cacheKey, result);

        // Remove from inflight map
        translationCache.deleteInflight(cacheKey);

        // Resolve with translation
        resolve(result);
      } catch (err) {
        // Clean up inflight on error
        translationCache.deleteInflight(cacheKey);

        // Reject promise with error
        reject(err);
      }
    }, wait);
  });

  // Store promise in inflight map to prevent duplicate requests
  translationCache.setInflight(cacheKey, promise);

  return promise;
}

/**
 * Make actual API call to MyMemory translation service
 * Internal function - should only be called by getTranslation()
 *  text - Text to translate
 *  from - Source language code
 *  to - Target language code
 * return - Promise resolving to translated text
 */
async function fetchTranslation(
  text: string,
  from: string,
  to: string
): Promise<string> {
  // Build API URL with parameters
  // encodeURIComponent ensures special characters are properly encoded
  const url = `${config.apiUrl}?q=${encodeURIComponent(
    text
  )}&langpair=${from}|${to}`;

  // Make HTTP GET request
  const response = await fetch(url);

  // Check for HTTP errors
  if (!response.ok) {
    throw new Error(
      `Translation API request failed: ${response.status} ${response.statusText}`
    );
  }

  // Parse JSON response
  const data: TranslationResponse = await response.json();

  // Extract translated text from response
  // Use optional chaining and provide fallback
  return data?.responseData?.translatedText || "(no translation)";
}

/**
 * Validate text before translation
 * Checks text length and existence
 *  text - Text to validate
 * return - Validation result with error message if invalid
 */
export function validateText(text: string): ValidationResult {
  // Check if text exists
  if (!text) {
    return {
      valid: false,
      error: "No text provided",
    };
  }

  // Check text length constraint
  if (text.length > config.maxTextLength) {
    return {
      valid: false,
      error: "string is too long for translation",
    };
  }

  // Text is valid
  return { valid: true };
}

/**
 * Get supported language pairs
 * Note: MyMemory API supports many language pairs
 * This is a helper function for UI/settings
 * return - Array of common language codes
 */
export function getSupportedLanguages(): string[] {
  return [
    "en", // English
    "uk", // Ukrainian
    "es", // Spanish
    "fr", // French
    "de", // German
    "it", // Italian
    "pt", // Portuguese
    "ru", // Russian
    "zh", // Chinese
    "ja", // Japanese
    "ko", // Korean
    "ar", // Arabic
    "pl", // Polish
    "nl", // Dutch
    "sv", // Swedish
    "tr", // Turkish
  ];
}
