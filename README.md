# YouTube Subtitle Translator v3
🎯 Instantly translate YouTube captions from English to Ukrainian with a single click - no copy-pasting required!

A powerful browser extension that translates YouTube video captions in real-time. Click on any word to see its translation, or Shift+click to translate entire caption segments.

![Extension Demo](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/1.png)

---

## ✨ Features

-  **Click to Translate** - Click any word in YouTube captions to see instant translation
-  **Shift+Click for Full Segment** - Translate entire caption lines at once
-  **Smart Caching** - Translations are cached for instant repeat lookups
-  **Precise Word Detection** - Automatically detects the exact word under your cursor
-  **Rate Limiting** - Optimized API calls to prevent rate limiting
-  **Persistent Settings** - Your language preferences are saved across sessions
-  **Beautiful UI** - Non-intrusive popup design with smooth animations

---

## 📸 Screenshots

### Click on Any Word
![Click Translation](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/2.png)
![Click Translation](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/5.png)
*Click on individual words for quick translation*

### Shift+Click for Full Segment
![Full Segment Translation](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/3.png)
![Full Segment Translation](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/4.png)
*Hold Shift and click to translate entire caption*

---

## 🎮 How to Use

1. **Open YouTube** and play any video with captions
2. **Enable captions** by clicking the CC button on the video player
3. **Click on any word** in the caption to see its translation
4. **Shift+Click** anywhere on a caption to translate the entire segment
5. **Translation appears** in a popup near your cursor for 3 seconds

---

## 🔧 Technical Details
### Architecture

- **TypeScript** - Type-safe development
- **Webpack** - Module bundling
- **MutationObserver** - Dynamic caption detection
- **Fetch API** - HTTP requests to translation service
- **localStorage** - Persistent settings

### Key Features

#### Smart Caching
- Translations cached in memory (Map)
- Instant repeat lookups (< 1ms)
- Cache key format: `from:to:text`

#### Rate Limiting
- Minimum 250ms between API requests
- Prevents API throttling
- Queues concurrent requests

#### Request Deduplication
- Multiple clicks on same word share one API request
- Reduces unnecessary API calls
- Improves performance

#### Intelligent Positioning
- Popup positioned near cursor
- Automatically adjusts to stay in viewport
- Handles edge cases (near screen edges)

## 🗺️ Roadmap

- [x] Basic word translation
- [x] Full segment translation
- [x] Smart caching
- [x] Rate limiting
- [ ] Settings page UI
- [ ] Translation history
- [ ] Multiple translation providers
- [ ] Firefox support
- [ ] Text-to-speech
- [ ] Custom keyboard shortcuts
- [ ] Dark mode support

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by [theunforg1ven](https://github.com/theunforg1ven)

</div>
