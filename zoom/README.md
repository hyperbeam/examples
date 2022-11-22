# Hyperbeam Zoom example

Zoom in and out of all tabs or individual ones.

## What is this useful for?

The `hb.tabs.setZoom` method allows you to zoom in and out of all tabs or individual ones. This is useful for controlling the browser with a touchscreen or trackpad, handling gestures or for creating a custom sized browser window for your app.

## Usage

```ts

// Client
const hb = await Hyperbeam(container, embedUrl);
hb.tabs.setZoom({
  zoomFactor: // zoom factor
  scope: // "per-tab" or "per-origin"
});
// https://developer.chrome.com/docs/extensions/reference/tabs/#method-setZoom
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/setZoom

```

## Steps

- Use `npm install` to install the dependencies altogether and navigate to the examples you want to run for more information.
- Set your API key by running the following command in your terminal:

```bash

# Linux/macOS
export HB_API_KEY=your_api_key

# Windows
set HB_API_KEY=your_api_key
```

Replace `your_api_key` with your API key from the [Hyperbeam dashboard](https://hyperbeam.com/dashboard).

- Run `npm run start`, a server should be listening on port 8080.

- Open <http://localhost:8080> on your browser. You should be able to zoom in and out of all tabs or individual ones.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
