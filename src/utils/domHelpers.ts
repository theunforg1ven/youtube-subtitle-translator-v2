/**
 * DOM Helper Utilities
 * Common DOM manipulation and query functions
 * Provides reusable helpers for DOM operations
 */

/**
 * Wait for element to appear in DOM
 * Useful for waiting on dynamically loaded content
 *  selector - CSS selector for element
 *  timeout - Maximum time to wait (milliseconds)
 * return - Promise resolving to found element
 */
export function waitForElement(
  selector: string,
  timeout: number = 5000
): Promise<Element> {
  return new Promise((resolve, reject) => {
    // Check if element already exists
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    // Set up observer to watch for element
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Set timeout to prevent infinite waiting
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Check if element is visible in viewport
 *  element - Element to check
 * return - True if element is fully visible
 */
export function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

/**
 * Check if element is partially visible in viewport
 *  element - Element to check
 * return - True if element is at least partially visible
 */
export function isElementPartiallyVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

/**
 * Get element's distance from viewport center
 * Useful for finding closest element to center
 *  element - Element to measure
 * return - Distance in pixels
 */
export function getDistanceFromViewportCenter(element: Element): number {
  const rect = element.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const elemCenterX = rect.left + rect.width / 2;
  const elemCenterY = rect.top + rect.height / 2;

  const dx = elemCenterX - centerX;
  const dy = elemCenterY - centerY;

  return Math.sqrt(dx * dx + dy * dy);
}
