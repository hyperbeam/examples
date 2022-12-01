# Hyperbeam Chrome Extension example

Upload your custom Chrome extensions to Hyperbeam virtual computers 👏

## New to Chrome extensions?

Here's a [guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/) on making a simple "Hello Extensions" extension.

In this example, we'll be loading the "Hello Extensions" extension in the Hyperbeam virtual computer — all the extension code can be found in the [extension/](extension/) folder.

## Usage

```ts
// Server

// Create a form data object with the extension zip file
const formData = new FormData();
formData.append("ex", fs.createReadStream("./extension.zip"));
formData.append("body", JSON.stringify(vmConfig));

// Add authorization headers
const headers = formData.getHeaders();
headers["Authorization"] = `Bearer ${process.env.HB_API_KEY}`;

// Send a POST request to the Hyperbeam API with the form data
const response = await post("https://engine.hyperbeam.com/v0/vm", formData, {
  headers,
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

- Visit <http://localhost:8080>. You should see the "Hello Extensions" extension pinned in Chrome.

![image](https://user-images.githubusercontent.com/18666879/195963632-03abbb3b-021f-4390-9c0d-e4c9c2fef4e0.png)

## Modifying the extension

Have you modified the extension code and want to run your modified extension? First, terminate the server by pressing CTRL+C. After that, run the following commands:

```bash

npm run build
npm run start

```

Then, visit <http://localhost:8080>.

Alternatively, run `npm run script` to run `script.sh`, which starts a virtual computer with the Chrome extension using `curl`.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
