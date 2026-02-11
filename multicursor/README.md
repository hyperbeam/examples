# Hyperbeam Multi-Cursor example

Interact with multiple users controlling the browser simultaneously in realtime.

## What is this useful for?

Multi-cursor is a feature that allows multiple users to control the browser simultaneously. This is useful for collaborative coding, remote pair programming, debugging and more.

## Usage

```ts
// Client
const hb = await Hyperbeam(container, embedUrl, {
  onCursor({ x, y, userId }) {
    // Render the cursor on the screen
  },
});
```

## Steps

- Run `npm start` to launch the demo.
- You should see the cursor activity of each session visible on each other.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
