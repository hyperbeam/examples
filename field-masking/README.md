# Hyperbeam Field Masking example

To hide the contents of input fields, you can specify a list of field masks. A field mask is a list of website URLs (`matches`) and CSS selectors (`selectors`). The "\*" wildcard character is supported for website URLs. For example,

```js
const hbConfig = {
  field_masking: [
    {
      matches: ["https://hyperbeam.com/*", "https://google.com"],
      selectors: [
        "input[type=\"email\"]",
        "input[type=\"password\"]"
      ]
    }
  ]
}
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

## Running locally

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
