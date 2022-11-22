# Hyperbeam Audio Context example

Use the AudioContext API to customize the audio output of the browser.

## What is this useful for?

Specifying the `audioTrackCb` option when creating a browser allows you to customize the audio output of the browser. This is useful for creating a custom audio player, creating a custom audio output for your app or for adding audio effects to the browser.

## Usage

```ts

// Client
const hb = await Hyperbeam(computer_div, embed_url, {
 audioTrackCb: (track: MediaStreamTrack) => {
  // Create a Media Stream and more
  // https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API
 }
});

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

- Open <http://localhost:8080> on your browser. You should be able to apply noise and reverberation effects to the audio output of the browser.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
