# Postal Finder Chrome Extension

**Postal Finder** is a lightweight Chrome extension that fetches and displays your current location, postal code, and other location details in real-time. It uses a FastAPI backend for reverse geocoding and provides a clean, animated UI.

---

## Features

- Fetches current location using the **Geolocation API**.
- Displays:
  - Full Address
  - Postal Code
  - Latitude & Longitude
- Animated, responsive UI with gradient styling.
- Graceful handling of errors and permission denials.
- FastAPI backend serving reverse-geocoding data.

---

## Demo

Watch the extension in action:  
[Screen Recording](https://github.com/Alleny244/Postal-Finder/raw/main/demo.gif)

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (ES6)
- **Backend**: Python, FastAPI, HTTPX
- **Deployment**: Railway / Docker
- **Version Control**: Git, GitHub

---

## Installation

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Alleny244/Postal-Finder.git
cd postal-finder/proxy-server
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the FastAPI server:

```bash
uvicorn apps:app --reload --host 0.0.0.0 --port 8000
```

> Make sure the server is running before using the extension.

---

### Frontend Setup (Chrome Extension)

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode**.
3. Click **Load unpacked** and select the `popup` folder from the repository.
4. Click the extension icon to open the popup and fetch your location.

---

## Project Structure

```
postal-finder/
├── css/
│   └── popup.css
├── images/
│   └── icons/
├── scripts/
│   └── script.js
├── popup/
│   └── popup.html
├── proxy-server/
│   ├── apps.py
│   ├── controllers/
│   ├── routers/
│   └── settings/
├── start.sh
└── manifest.json
```

---

## Usage

1. Click the extension icon.
2. Allow location access.
3. View your current address, postal code, coordinates, and region information.
4. In case of errors, use the **Retry** button to re-fetch your location.

---

## Notes

- Requires location services enabled in your browser.
- Ensure backend server is running.
- Designed to handle errors such as denied permissions or failed API calls gracefully.


## License

MIT License

---

## Versioning

- Current Version: **v1.0.0**
