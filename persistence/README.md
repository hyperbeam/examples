# Hyperbeam Persistence example

Save and access browser data across multiple sessions.

## What is this useful for?

Persistence is a feature that allows you to save and access browser data across multiple sessions. This is useful for preserving logins, bookmarks, user data, cookies, local storage, etc. across multiple sessions. A saved session is called a "profile" and is identified by the ID of the session that it was initially saved from. Profiles are only saved when the session is closed.

## Usage

```js
// save the session when it's closed to a new profile
let profile = true

let response = await axios.post("https://engine.hyperbeam.com/v0/vm", {
  profile,
}, { headers });

// close session
await axios.delete(`https://engine.hyperbeam.com/v0/vm/${response.session_id}`)

// the profile ID is the session ID of the intially saved session
const profile_id = response.session_id

// simple usage:
// load from and save to existing profile
profile = profile_id

// or
// advanced usage:
// "fork" a profile: load from existing profile but save to new profile
// the new session's ID is the forked profile ID
profile = {
  load: profile_id,
  save: true,
}

response = await axios.post("https://engine.hyperbeam.com/v0/vm", {
  profile,
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
