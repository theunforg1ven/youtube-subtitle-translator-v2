/**
 * Event Handlers
 * Manages user interactions with captions
 * Coordinates between word extraction, translation, and popup display
 */

import { config } from "../config/settings";
import {
  extractWordUnderCursor,
  getElementText,
} from "../services/wordExtractor";
import { getTranslation, validateText } from "../services/translationService";
import { showPopup } from "./popup";

/**
 * Attach all event listeners to a caption element
 * Sets up hover effects and click handlers
 *  caption - Caption element to attach listeners to
 */
export function attachCaptionListeners(caption: HTMLElement): void {
  // Hover effect: add visual feedback class on mouse enter
  caption.addEventListener("mouseenter", () => {
    caption.classList.add(config.hoverClass);
  });

  // Hover effect: remove visual feedback class on mouse leave
  caption.addEventListener("mouseleave", () => {
    caption.classList.remove(config.hoverClass);
  });

  // Translation trigger: handle click events
  caption.addEventListener("click", handleCaptionClick);
}

/**
 * Handle click on caption element
 * Main event handler for translation requests
 *  event - Mouse event from click
 */
async function handleCaptionClick(event: MouseEvent): Promise<void> {
  // Prevent default browser behavior (text selection, link following)
  event.preventDefault();

  // Extract text based on click type (Shift or normal)
  const text = extractText(event);

  // Exit if no text extracted
  if (!text) return;

  // Translate and display result
  await translateAndShow(text, event.clientX, event.clientY);
}

/**
 * Extract text based on click type
 * Shift + click: entire caption segment
 * Normal click: single word under cursor
 *  event - Mouse event with Shift key state
 * return - Extracted text or null
 */
function extractText(event: MouseEvent): string | null {
  // Check if Shift key was held during click
  if (event.shiftKey) {
    // Shift + click: translate entire caption segment
    const target = event.currentTarget as HTMLElement;
    return getElementText(target).trim();
  } else {
    // Normal click: translate single word under cursor
    // Falls back to entire segment if word extraction fails
    const word = extractWordUnderCursor(event);
    if (word) return word;

    // Fallback: use entire segment
    const target = event.currentTarget as HTMLElement;
    return getElementText(target).trim();
  }
}

/**
 * Translate text and display popup with result
 * Handles validation, translation, and error display
 *  text - Text to translate
 *  x - Mouse X coordinate for popup
 *  y - Mouse Y coordinate for popup
 */
async function translateAndShow(
  text: string,
  x: number,
  y: number
): Promise<void> {
  // Validate text before translation
  const validation = validateText(text);

  if (!validation.valid) {
    // Show validation error
    showPopup(x, y, `(${validation.error})`, { error: true });
    return;
  }

  try {
    // Get translation from service
    // This handles caching and rate limiting automatically
    const translation = await getTranslation(text);

    // Display translation result
    // Format: "original → translation"
    showPopup(x, y, `${text} → ${translation}`);
  } catch (err) {
    // Show error message to user
    showPopup(x, y, "(translation error)", { error: true });
  }
}

/*
Remove event listeners from caption element
Useful for cleanup or disabling extension
 caption - Caption element to remove listeners from
*/
export function removeCaptionListeners(caption: HTMLElement): void {
  // Remove all event listeners by cloning and replacing element
  const newCaption = caption.cloneNode(true) as HTMLElement;
  caption.parentNode?.replaceChild(newCaption, caption);

  // Remove marker flag
  delete newCaption.dataset.listenerAdded;
}
