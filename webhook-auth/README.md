# Hyperbeam Timeout example

Bring down costs and add quickly add paywalls using timeouts.

## What is this useful for?

The Hyperbeam API lets you specify absolute, inactive and offine timeouts for your browser sessions. This is useful to bring down costs, add paywalls, reduce the number of concurrent sessions and more.

## Usage

```ts
// Server
const response = await axios.post(
  "https://engine.hyperbeam.com/v0/vm",
  {
    timeout: {
      offline: 10, // when clients are offline
      inactive: 30, // when clients have the vm open but are inactive
      absolute: 60, // absolute time before the vm is terminated
      warning: 15, // time before the vm is terminated to show a warning
      webhook: {
        url: webhookUrl, // url to send the timeout webhook event to
        bearer, // bearer token to send with the webhook
      },
    },
  },
  { headers }
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

- Open <http://localhost:8080> on your browser. You should be able to see the browser session being terminated after 60 seconds.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
