# chrome-extension

Upload your custom extensions to Hyperbeam virtual computers 👏

## New to Chrome extensions?

Here's a [guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/) on making a simple "Hello Extensions" extension.

In this example, we'll be loading the "Hello Extensions" extension in the Hyperbeam virtual computer. All the extension code can be found in `extension/`.

## Getting started

Run the following commands:

```bash
export HB_API_KEY=<your-api-key> # Replace "your-api-key" with your actual API key
npm install
npm run start
```

After running `npm run start`, a server should be listening on port 8080.

Visit http://localhost:8080. You should see the "Hello Extensions" extension pinned on Chrome.

![image](https://user-images.githubusercontent.com/18666879/195963632-03abbb3b-021f-4390-9c0d-e4c9c2fef4e0.png)

## Modifying the extension

Have you modified the extension code and want to run your modified extension? First, terminate the server by pressing CTRL+C. After that, run the following commands:

```bash
npm run build 
npm run start
```

Then, visit http://localhost:8080.

## Need more help?

Send us an email at [mailto:founders@hyperbeam.com](founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
