/**
 * Popup Display Manager
 * Handles popup creation, positioning, and lifecycle
 * Ensures popup is always visible within viewport
 */

import { config } from "../config/settings";
import type { PopupOptions, Position } from "../types/types.ts";

/**
 * Show translation popup at specified coordinates
 * Main entry point for displaying translation results
 *  x - Mouse X coordinate
 *  y - Mouse Y coordinate
 *  text - Text to display in popup
 *  options - Display options (error state, etc.)
 */
export function showPopup(
  x: number,
  y: number,
  text: string,
  options: PopupOptions = {}
): void {
  const { error = false } = options;

  // Step 1: Create popup DOM element
  const popup = createPopupElement(text, error);

  // Step 2: Add to DOM (hidden) for measurement
  document.body.appendChild(popup);

  // Step 3: Calculate optimal position
  const position = calculatePosition(x, y, popup);

  // Step 4: Apply position and make visible
  applyPosition(popup, position);

  // Step 5: Schedule automatic removal
  scheduleRemoval(popup);
}

/**
 * Create popup DOM element with styling
 * Element is created in hidden state for measurement
 *  text - Text content for popup
 *  isError - Whether this is an error message
 * return - Created popup element
 */
function createPopupElement(text: string, isError: boolean): HTMLDivElement {
  // Create div element
  const popup = document.createElement("div");

  // Set base CSS class
  popup.className = config.popupClass;

  // Set text content
  popup.textContent = text;

  // Add error class if needed
  if (isError) {
    popup.classList.add(config.popupErrorClass);
  }

  // Set initial hidden state for measurement
  // visibility:hidden allows measurement while keeping layout
  popup.style.visibility = "hidden";

  // Disable pointer events to avoid interference
  popup.style.pointerEvents = "none";

  // Use fixed positioning relative to viewport
  popup.style.position = "fixed";

  return popup;
}

/**
 * Calculate optimal popup position
 * Ensures popup stays within viewport boundaries
 *  x - Mouse X coordinate
 *  y - Mouse Y coordinate
 *  popup - Popup element (must be in DOM for measurement)
 * return - Calculated position coordinates
 */
function calculatePosition(x: number, y: number, popup: HTMLElement): Position {
  // Get popup dimensions after rendering
  const rect = popup.getBoundingClientRect();
  const popupW = rect.width;
  const popupH = rect.height;

  // Initial position: horizontally at cursor, vertically above cursor
  let left = x;
  let top = y - popupH - config.popupOffsetY;

  // === HORIZONTAL BOUNDARY CHECKS ===

  // Check right edge: popup extends beyond right viewport edge
  const maxLeft = window.innerWidth - config.popupMargin;
  if (left + popupW > maxLeft) {
    // Shift left to fit within viewport
    left = maxLeft - popupW;
  }

  // Check left edge: popup extends beyond left viewport edge
  if (left < config.popupMargin) {
    // Shift right to minimum margin
    left = config.popupMargin;
  }

  // === VERTICAL BOUNDARY CHECKS ===

  // Check top edge: popup extends above viewport
  if (top < config.popupMargin) {
    // Try positioning below cursor instead
    top = y + config.popupOffsetY;

    // Check if below-cursor position also doesn't fit
    const maxTop = window.innerHeight - config.popupMargin;
    if (top + popupH > maxTop) {
      // Last resort: center vertically on screen
      top = Math.max(config.popupMargin, window.innerHeight / 2 - popupH / 2);
    }
  }

  return { left, top };
}

/**
 * Apply calculated position to popup and make visible
 *  popup - Popup element
 *  position - Calculated position coordinates
 */
function applyPosition(popup: HTMLElement, position: Position): void {
  // Set position
  popup.style.left = `${position.left}px`;
  popup.style.top = `${position.top}px`;

  // Make visible
  popup.style.visibility = "visible";

  // Enable pointer events
  popup.style.pointerEvents = "auto";
}

/**
 * Schedule automatic popup removal
 * Popup will be removed from DOM after configured duration
 *  popup - Popup element to remove
 */
function scheduleRemoval(popup: HTMLElement): void {
  setTimeout(() => {
    // Remove element from DOM
    popup.remove();
  }, config.popupDisplayDuration);
}

/**
 * Manually close popup
 * Useful for immediate cleanup or testing
 *  popup - Popup element to close
 */
export function closePopup(popup: HTMLElement): void {
  popup.remove();
}

/**
 * Close all open popups
 * Useful for cleanup on navigation or extension disable
 */
export function closeAllPopups(): void {
  const popups = document.querySelectorAll(`.${config.popupClass}`);
  popups.forEach((popup) => popup.remove());
}
