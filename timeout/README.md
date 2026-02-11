# Hyperbeam Timeout example

Bring down costs and add quickly add paywalls using timeouts.

## What is this useful for?

The Hyperbeam API lets you specify absolute, inactive and offine timeouts for your browser sessions. This is useful to bring down costs, add paywalls, reduce the number of concurrent sessions and more.

## Usage

```ts
// Server
const response = await fetch(
  "https://engine.hyperbeam.com/v0/vm",
  {
    method: "POST",
    body: JSON.stringify({
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
    }),
  },
  { headers }
);
```

## Steps

- Run `npm start` to launch the demo.
- You should be able to see the Hyperbeam virtual computer session being terminated after 60 seconds.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
