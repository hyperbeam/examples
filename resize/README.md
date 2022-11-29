# Hyperbeam Resize example

Resize and reposition the browser window dynamically.

## What is this useful for?

The `resize` method allows you to resize and reposition the browser window dynamically. This is useful for creating responsive web apps, testing responsive designs across multiple devices, or creating a custom sized browser window for your app.

## Usage

```ts

// Client
const hb = await Hyperbeam(container, embedUrl);
hb.resize(
  width, // width in pixels
  height // height in pixels
);

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

- Open <http://localhost:8080> on your browser. You should be able to drag and resize the browser window.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
