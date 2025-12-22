/**
 * Caption Observer
 * Watches for new YouTube caption elements and attaches event listeners
 * Uses MutationObserver API to detect DOM changes dynamically
 */

import { config } from "../config/settings";
import { attachCaptionListeners } from "../ui/eventHandlers";

/**
 * Initialize MutationObserver to watch for caption elements
 * YouTube dynamically adds/removes caption elements as video plays
 * This function sets up an observer to detect these changes
 * return - MutationObserver instance
 */
export function initializeCaptionObserver(): MutationObserver {
  // Create observer with callback function
  const observer = new MutationObserver(() => {
    // Query all caption segments in the DOM
    const captions = document.querySelectorAll(config.captionSelector);

    // Process each caption element
    captions.forEach((caption: Element) => {
      // Type guard: ensure element is HTMLElement
      if (!(caption instanceof HTMLElement)) return;

      // Check if we've already processed this caption
      // dataset.listenerAdded is our marker flag
      if (caption.dataset.listenerAdded) return;

      // Mark this caption as processed to avoid duplicate listeners
      caption.dataset.listenerAdded = "true";

      // Attach all event listeners (hover, click)
      attachCaptionListeners(caption);
    });
  });

  // Start observing the entire document body
  // childList: true - watch for added/removed child nodes
  // subtree: true - watch all descendants, not just direct children
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

/**
 * Stop observing caption changes
 * Call this function when extension needs to be disabled
 *  observer - MutationObserver instance to disconnect
 */
export function disconnectObserver(observer: MutationObserver): void {
  observer.disconnect();
}
