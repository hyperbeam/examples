# Hyperbeam Resize example

Resize and reposition the browser window dynamically.

https://user-images.githubusercontent.com/10488070/206273355-c722a7af-32bb-4f31-b463-a521697d18a7.mp4

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

- Run `npm start` to launch the demo.
- You should be able to drag and resize the Hyperbeam virtual computer window.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
