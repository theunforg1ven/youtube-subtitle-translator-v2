// Configuration object structure
export interface Config {
  defaultFromLang: string;
  defaultToLang: string;
  minRequestInterval: number;
  maxTextLength: number;
  popupDisplayDuration: number;
  popupOffsetY: number;
  popupMargin: number;
  captionSelector: string;
  hoverClass: string;
  popupClass: string;
  popupErrorClass: string;
  apiUrl: string;
}

// Translation API response structure
export interface TranslationResponse {
  responseData?: {
    translatedText?: string;
    match?: number;
  };
  quotaFinished?: boolean;
  mtLangSupported?: null;
  responseDetails?: string;
  responseStatus?: number;
  responderId?: string;
  matches?: Array<{
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: string;
    reference: string | null;
    match: number;
  }>;
}

// Popup display options
export interface PopupOptions {
  error?: boolean;
}

// Position coordinates for popup
export interface Position {
  left: number;
  top: number;
}

// Text validation result
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Cache entry structure
export interface CacheEntry {
  translation: string;
  timestamp: number;
}

// Language code type (ISO 639-1)
export type LanguageCode = string; // 'en', 'uk', 'es', 'fr' etc.

// Translation function type
export type TranslationFunction = (
  text: string,
  from?: LanguageCode,
  to?: LanguageCode
) => Promise<string>;
