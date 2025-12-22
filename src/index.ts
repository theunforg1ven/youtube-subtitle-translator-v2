/**
 * YouTube Caption Translator
 * Entry Point - Initializes the extension
 *
 * This is the main entry point that runs when the extension loads
 * on YouTube pages. It sets up the caption observer and logs status.
 */

import { initializeCaptionObserver } from "./core/observer";
import { config } from "./config/settings";

/**
 * Initialize the extension
 * Sets up all required observers and event handlers
 */
function init(): void {
  console.log("YouTube Caption Translator initializing...");

  try {
    // Start observing for caption elements
    const observer = initializeCaptionObserver();

    // Log successful initialization
    console.log("YouTube Caption Translator initialized successfully");
    console.log(
      `Translation: ${config.defaultFromLang} → ${config.defaultToLang}`
    );
    console.log("Click on captions to translate words");
    console.log("Shift + click to translate entire caption");

    // Store observer reference for potential cleanup
    (window as any).__ytTranslatorObserver = observer;
  } catch (error) {
    console.error("Failed to initialize YouTube Caption Translator:", error);
  }
}

/**
 * Cleanup function
 * Call this to disable the extension
 */
function cleanup(): void {
  const observer = (window as any).__ytTranslatorObserver;
  if (observer) {
    observer.disconnect();
    console.log("YouTube Caption Translator disabled");
  }
}

// Expose cleanup function globally for debugging
(window as any).__ytTranslatorCleanup = cleanup;

// Initialize when DOM is ready
if (document.readyState === "loading") {
  // DOM still loading - wait for DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", init);
} else {
  // DOM already loaded - initialize immediately
  init();
}
