# Load custom Chrome Extension

Upload and use a custom Chrome extension in the Hyperbeam virtual computer.

## New to Chrome extensions?

Here's a [guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/) on making a simple "Hello Extensions" extension.

In this example, we'll be loading the "Hello Extensions" extension in the Hyperbeam virtual computer — all the extension code can be found in the [extension/](extension/) folder.

## Usage

```ts
// Server

// Create a form data object with the extension zip file
const formData = new FormData();
const blob = await openAsBlob("./extension.zip", {
  type: "application/zip",
});
formData.append("ex", blob);
formData.append("body", JSON.stringify(hbConfig));

// Send a POST request to the Hyperbeam API with the form data
const resp = await fetch("https://engine.hyperbeam.com/v0/vm", {
  method: "POST",
  headers: {
    authorization: process.env.HB_API_KEY,
  },
  body: formData,
});
```

## Steps

- Run `npm start` to launch the demo.
- You should see the "Hello Extensions" extension pinned in the Hyperbeam virtual computer.

![image](https://user-images.githubusercontent.com/18666879/195963632-03abbb3b-021f-4390-9c0d-e4c9c2fef4e0.png)

Also see `script.sh` to see how to use `curl` to load the extension in the Hyperbeam virtual computer instance.

## Modifying the extension

- Run `npm run zip` to recreate the extension zip file.
- Terminate the server and rerun `npm start` to relaunch the demo.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
