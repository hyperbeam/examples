# Hyperbeam Persistence example

Save and access browser data across multiple sessions.

## What is this useful for?

Persistence is a feature that allows you to save and access browser data across multiple sessions. This is useful for preserving logins, bookmarks, user data, cookies, local storage, etc. across multiple sessions.

## Usage

```ts

// Server
const myProfileId = "..." // The session ID from the previous saved session
const response = await axios.post("https://engine.hyperbeam.com/v0/vm", {
  profile: myProfileId //  Pass the session ID to load the session and overwrite it when the session is over
}, { headers });

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

- Run `npm run start`, a server should be listening on port 8081.

- Open <http://localhost:8081> on your browser. You should be able to see the browser data being saved and accessed across multiple sessions.

## Need more help?

Send us an email at [founders@hyperbeam.com](mailto:founders@hyperbeam.com) or join our community [Discord server](https://discord.gg/D78RsGfQjq).
