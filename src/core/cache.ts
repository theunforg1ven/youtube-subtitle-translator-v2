/**
 * Translation Cache Manager
 * Handles caching and deduplication of translation requests
 * Implements singleton pattern for global cache access
 */

/**
 * TranslationCache class
 * Manages translation results cache and ongoing requests
 */
class TranslationCache {
  // Map to store completed translations: key -> translation string
  private cache: Map<string, string>;

  // Map to track ongoing requests: key -> Promise
  private inflight: Map<string, Promise<string>>;

  // Timestamp of the last API request (for rate limiting)
  private lastRequestTime: number;

  constructor() {
    this.cache = new Map<string, string>();
    this.inflight = new Map<string, Promise<string>>();
    this.lastRequestTime = 0;
  }

  /**
   * Generate unique cache key from language pair and text
   * Format: "from:to:text"
   *  text - Text to translate
   *  from - Source language code
   *  to - Target language code
   * return - Unique cache key string
   */
  public generateKey(text: string, from: string, to: string): string {
    return `${from}:${to}:${text}`;
  }

  /**
   * Check if translation exists in cache
   *  key - Cache key to check
   * return - True if translation is cached
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Get cached translation
   *  key - Cache key
   * return - Cached translation string or undefined
   */
  public get(key: string): string | undefined {
    return this.cache.get(key);
  }

  /**
   * Store translation in cache
   *  key - Cache key
   *  value - Translation string to cache
   */
  public set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  /**
   * Check if request is currently in progress
   *  key - Cache key
   * return - True if request is pending
   */
  public hasInflight(key: string): boolean {
    return this.inflight.has(key);
  }

  /**
   * Get inflight request promise
   *  key - Cache key
   * return - Promise that resolves to translation
   */
  public getInflight(key: string): Promise<string> | undefined {
    return this.inflight.get(key);
  }

  /**
   * Store inflight request promise
   *  key - Cache key
   *  promise - Promise that will resolve to translation
   */
  public setInflight(key: string, promise: Promise<string>): void {
    this.inflight.set(key, promise);
  }

  /**
   * Remove inflight request after completion
   *  key - Cache key
   */
  public deleteInflight(key: string): void {
    this.inflight.delete(key);
  }

  /**
   * Get timestamp of last API request
   * return - Timestamp in milliseconds
   */
  public getLastRequestTime(): number {
    return this.lastRequestTime;
  }

  /**
   * Update last request timestamp to current time
   * Used for rate limiting calculations
   */
  public updateLastRequestTime(): void {
    this.lastRequestTime = Date.now();
  }

  /**
   * Clear all cached translations and inflight requests
   * Useful for debugging or manual cache reset
   */
  public clear(): void {
    this.cache.clear();
    this.inflight.clear();
  }

  /**
   * Get cache statistics
   * return - Object containing cache size and inflight count
   */
  public getStats(): { cacheSize: number; inflightCount: number } {
    return {
      cacheSize: this.cache.size,
      inflightCount: this.inflight.size,
    };
  }
}

// Export singleton instance for global access
export const translationCache = new TranslationCache();
