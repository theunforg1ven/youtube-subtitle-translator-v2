# YouTube Subtitle Translator v3
🎯 Instantly translate YouTube captions from English to Ukrainian with a single click - no copy-pasting required!

A powerful browser extension that translates YouTube video captions in real-time. Click on any word to see its translation, or Shift+click to translate entire caption segments.

![Extension Demo](https://github.com/theunforg1ven/youtube-subtitle-translator-v2/blob/main/screens/1.png)

---

## ✨ Features

- 🖱️ **Click to Translate** - Click any word in YouTube captions to see instant translation
- ⌨️ **Shift+Click for Full Segment** - Translate entire caption lines at once
- ⚡ **Smart Caching** - Translations are cached for instant repeat lookups
- 🎯 **Precise Word Detection** - Automatically detects the exact word under your cursor
- 🚀 **Rate Limiting** - Optimized API calls to prevent rate limiting
- 💾 **Persistent Settings** - Your language preferences are saved across sessions
- 🎨 **Beautiful UI** - Non-intrusive popup design with smooth animations

---

## 📸 Screenshots

### Click on Any Word
![Click Translation](screens/screen2.png)
*Click on individual words for quick translation*

### Shift+Click for Full Segment
![Full Segment Translation](screens/screen3.png)
*Hold Shift and click to translate entire caption*

### Hover Effect
![Hover Effect](screens/screen4.png)
*Visual feedback shows clickable captions*

### Smart Positioning
![Smart Positioning](screens/screen5.png)
*Popup automatically adjusts to stay visible on screen*

---

## 🚀 Installation

### From Release (Recommended)

1. Download the latest release from [Releases](../../releases)
2. Extract the ZIP file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable **Developer mode** (toggle in top-right corner)
5. Click **Load unpacked**
6. Select the extracted `dist` folder
7. Done! ✅

### Build from Source

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/youtube-subtitle-translator-v3.git
cd youtube-subtitle-translator-v3

# Install dependencies
npm install

# Build the extension
npm run build

# The extension will be built in the dist/ folder
```

Then follow steps 3-6 from "From Release" section above.

---

## 🎮 How to Use

1. **Open YouTube** and play any video with captions
2. **Enable captions** by clicking the CC button on the video player
3. **Click on any word** in the caption to see its translation
4. **Shift+Click** anywhere on a caption to translate the entire segment
5. **Translation appears** in a popup near your cursor for 3 seconds

### Tips
- 💡 Translations are cached - clicking the same word again is instant!
- 💡 The popup automatically positions itself to stay visible
- 💡 Works with any YouTube video that has captions

---

## ⚙️ Configuration

### Change Translation Languages

Open browser console (F12) and run:

```javascript
// Change source language (default: English)
localStorage.setItem('yst_from', 'en');

// Change target language (default: Ukrainian)
localStorage.setItem('yst_to', 'uk');

// Reload the page to apply changes
location.reload();
```

### Supported Language Codes

| Language | Code |
|----------|------|
| English | `en` |
| Ukrainian | `uk` |
| Spanish | `es` |
| French | `fr` |
| German | `de` |
| Italian | `it` |
| Portuguese | `pt` |
| Russian | `ru` |
| Chinese | `zh` |
| Japanese | `ja` |
| Korean | `ko` |
| Arabic | `ar` |
| Polish | `pl` |
| Dutch | `nl` |
| Swedish | `sv` |
| Turkish | `tr` |

[See full list of language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

---

## 🏗️ Project Structure

```
youtube-subtitle-translator-v3/
├── src/
│   ├── config/
│   │   └── settings.ts          # Configuration constants
│   ├── core/
│   │   ├── cache.ts              # Translation cache management
│   │   └── observer.ts           # Caption detection
│   ├── services/
│   │   ├── translationService.ts # API integration
│   │   └── wordExtractor.ts      # Word extraction logic
│   ├── ui/
│   │   ├── eventHandlers.ts      # Event handling
│   │   └── popup.ts              # Popup display
│   ├── types/
│   │   └── index.ts              # TypeScript definitions
│   └── index.ts                  # Entry point
├── styles/
│   └── popup.css                 # Popup styling
├── screens/                      # Screenshots
├── icons/                        # Extension icons
├── dist/                         # Built extension (generated)
├── manifest.json                 # Extension manifest
├── tsconfig.json                 # TypeScript config
├── webpack.config.js             # Build configuration
└── package.json                  # Dependencies
```

---

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Chrome or Chromium-based browser

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start development mode (watches for changes)
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Clean build
npm run clean
```

### Development Workflow

1. Make changes to source files in `src/`
2. Run `npm run dev` to auto-rebuild on changes
3. Reload extension in Chrome (`chrome://extensions/` → click reload icon)
4. Test changes on YouTube

---

## 🔧 Technical Details

### Architecture

- **TypeScript** - Type-safe development
- **Webpack** - Module bundling
- **MutationObserver** - Dynamic caption detection
- **Fetch API** - HTTP requests to translation service
- **localStorage** - Persistent settings
- **Content Script** - Runs on YouTube pages

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

---

## 🌐 Translation API

This extension uses [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php):

- **Free tier**: 1000 requests/day
- **No API key required**
- **Supports 100+ language pairs**
- **Rate limit**: 10 requests/second

### API Response Example

```json
{
  "responseData": {
    "translatedText": "чудовий",
    "match": 1.0
  },
  "responseStatus": 200
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Ideas for Contributions

- 🌍 Add support for more translation services (Google Translate, DeepL)
- 🎨 Customizable popup themes
- 📱 Firefox/Edge compatibility
- 🔊 Text-to-speech pronunciation
- 📝 Translation history panel
- ⚙️ Settings page UI
- 🌐 Internationalization (i18n)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Translation service provided by [MyMemory](https://mymemory.translated.net/)
- Inspired by the need for quick language learning while watching videos
- Built with ❤️ using TypeScript

---

## 📞 Support

- **Issues**: [GitHub Issues](../../issues)
- **Questions**: Open a [Discussion](../../discussions)
- **Feature Requests**: [Request a Feature](../../issues/new)

---

## 📊 Stats

![GitHub release (latest by date)](https://img.shields.io/github/v/release/YOUR_USERNAME/youtube-subtitle-translator-v3)
![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/youtube-subtitle-translator-v3)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/youtube-subtitle-translator-v3)
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/youtube-subtitle-translator-v3)

---

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

Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)

</div>
