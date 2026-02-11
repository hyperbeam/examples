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

- Run `npm start` to launch the demo.
- You should be able to zoom in and out of all tabs or individual ones.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
