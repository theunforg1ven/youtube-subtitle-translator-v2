/**
 * Word Extractor Service
 * Extracts words from text at specific cursor positions
 * Handles browser compatibility for caret position detection
 */

/**
 * Get DOM Range from screen coordinates
 * Different browsers use different APIs (Firefox vs Chrome/Safari)
 *  x - Mouse X coordinate
 *  y - Mouse Y coordinate
 * return - Range object or null if not supported
 */
export function getRangeFromPoint(x: number, y: number): Range | null {
  // Firefox method: caretPositionFromPoint
  if (document.caretPositionFromPoint) {
    // Get caret position at coordinates
    const pos = document.caretPositionFromPoint(x, y);
    if (!pos) return null;

    // Create Range object from position
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.setEnd(pos.offsetNode, pos.offset);
    return range;
  }

  // Chrome/Safari method: caretRangeFromPoint
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  }

  // Browser doesn't support either method
  return null;
}

/**
 * Extract word at specific character offset in text
 * Uses regex to find word boundaries (letters, numbers, hyphens, apostrophes)
 *  text - Full text string
 *  offset - Character position to extract word from
 * return - Extracted word or null
 */
export function wordAt(text: string, offset: number): string | null {
  // Validate text input
  if (!text) return null;

  // Ensure offset is within text bounds
  const pos = Math.max(0, Math.min(offset, text.length));

  // Search backwards from offset for word start
  // Regex matches word characters, apostrophes, and hyphens
  // Example: "don't" or "well-known" are single words
  const left = text.slice(0, pos).search(/[\w''\-]+$/u);

  // Search forwards from offset for word end
  // Matches first non-word character
  // \p{L} = any letter in any language (Unicode)
  // \p{N} = any numeric character
  const rightRel = text.slice(pos).search(/[^'\p{L}\p{N}\-]/u);

  // Initialize word boundaries to entire text as default
  let start = 0;
  let end = text.length;

  // Update start position if word boundary found
  if (left >= 0) start = left;

  // Update end position if word boundary found
  if (rightRel >= 0) end = pos + rightRel;

  // Extract word substring and trim whitespace
  return text.slice(start, end).trim() || null;
}

/**
 * Extract word under cursor from mouse event
 * Main entry point for word extraction
 *  event - Mouse event containing click coordinates
 * return - Extracted word or null
 */
export function extractWordUnderCursor(event: MouseEvent): string | null {
  try {
    // Get DOM range at click position
    const range = getRangeFromPoint(event.clientX, event.clientY);
    if (!range || !range.startContainer) return null;

    // Get the DOM node at click position
    const node = range.startContainer;

    // Check if we clicked directly on a text node
    if (node.nodeType === Node.TEXT_NODE) {
      // Text node: extract word at offset
      const text = node.textContent || "";
      const offset = range.startOffset;
      return wordAt(text, offset);
    } else {
      // Element node: fallback to first word of element
      const target = event.target as HTMLElement;
      const text = target.textContent || "";
      return text.split(/\s+/)[0] || null;
    }
  } catch (error) {
    // Return null on any error (security, permissions, etc.)
    console.error("Error extracting word:", error);
    return null;
  }
}

/**
 * Get text content from caption element
 * Finds closest caption segment and extracts its text
 *  target - DOM element (event target)
 * return - Text content of caption segment
 */
export function getElementText(target: HTMLElement): string {
  // Try to find closest caption segment element
  // Uses optional chaining for browser compatibility
  const seg =
    (target.closest?.(".ytp-caption-segment") as HTMLElement | null) ||
    (target.classList?.contains("ytp-caption-segment") ? target : null);

  // Return segment text if found, otherwise return target text
  if (seg) return seg.textContent || "";
  return target.textContent || "";
}
