# 🐟 SmellPhisy – A Browser Extension to Detect Phishing

**SmellPhisy** is a lightweight browser extension that helps users detect phishing websites and suspicious content. It highlights potential threats and provides quick insights directly in your browser.

> **Solves a Gmail Flaw**: Gmail often fails to flag phishing URLs when they're sent from trusted or non-spam senders. SmellPhisy bridges this gap by scanning all visited URLs, regardless of sender reputation.

## Features

* Highlights potentially dangerous links or elements on a webpage.
* Communicates with a Python backend (`server.py`) to analyze content.
* Simple and intuitive popup interface.
* Easily extendable with your own detection logic.

## Components

### Extension Files

* **manifest.json**: Configuration file for the browser extension.
* **background.js**: Manages background tasks and event handling.
* **content.js**: Injected into webpages to interact with DOM elements.
* **highlight.css**: Styling for highlighted phishing content.
* **popup.html / popup.js**: UI for the extension popup.
* **icon.png**: Extension icon.

### Backend

* **server.py**: A Python server that performs phishing detection. Can be extended with ML models or API integrations.

## Installation

### 1. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `SmellPhisy` directory

### 2. Run the Backend Server

Make sure you have Python installed.

```bash
cd SmellPhisy
python server.py
```

> You may need to install dependencies used in `server.py`.

## Folder Structure

```
SmellPhisy/
├── background.js
├── content.js
├── highlight.css
├── icon.png
├── manifest.json
├── popup.html
├── popup.js
└── server.py
└── Proficle
```

## Future Improvements

* Integrate a Machine Learning model for phishing detection.
* Use real-time threat intelligence feeds.
* Add user feedback/reporting mechanism.

## License

MIT License. See `LICENSE` file for details.

## Acknowledgements

Inspired by the need to make the web a safer place.
