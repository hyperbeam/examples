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

- Open <http://localhost:8080> in different tabs or devices. You should be able to see the cursors of other users and control the browser simultaneously.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
