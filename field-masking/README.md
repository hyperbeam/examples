# Hyperbeam Field Masking example

To hide the contents of input fields, you can specify a list of field masks. A field mask is a list of website URLs (`matches`) and CSS selectors (`selectors`). The "\*" wildcard character is supported for website URLs. For example,

```js
const hbConfig = {
  field_masking: [
    {
      matches: ["https://hyperbeam.com/*", "https://google.com"],
      selectors: ['input[type="email"]', 'input[type="password"]'],
    },
  ],
};
```

The snippet above applies field masking to all email and password input fields on google.com (just google.com), and all pages on hyperbeam.com (e.g. hyperbeam.com/foo, hyperbeam.com/bar, etc.).

Sometimes you want different selectors for different websites. In that situation, you can provide several field masks:

```js
const hbConfig = {
  field_masking: [
    {
      matches: ["https://hyperbeam.com/*", "https://google.com"]
      selectors: [
        "input[type=\"email\"]",
        "input[type=\"password\"]"
      ]
    },
    {
      matches: ["https://profile.w3schools.com/login"],
      selectors: [
        "input[name=\"email\"]",
        "input[name=\"password\"]"
      ]
    }
  ]
}
```

## Steps

- Run `npm start` to launch the demo.
- You should be able to see the fields with masking enabled.
- Click the button on the top-left to toggle access to the masked fields.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
