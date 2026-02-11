# Audio visualization

Use the WebAudio API to visualize audio frequency data.

## What is this useful for?

Specifying the `audioTrackCb` option when calling the `Hyperbeam` function allows you to allows you to directly access and manipulate the audio track of the stream. This is useful for creating a custom audio player, creating a custom audio output for your app or for adding audio effects to the audio output of the Hyperbeam virtual computer.

## Usage

```ts
// Client
const hb = await Hyperbeam(hbDiv, data.embed_url, {
  audioTrackCb: (track: MediaStreamTrack) => {
    // Create a Media Stream and more
    // https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API
  },
});
```

## Steps

- Run `npm start` to launch the demo.
- Visit a website that plays music in the Hyperbeam virtual computer. You should see the audio visualization.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
