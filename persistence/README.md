# Hyperbeam Persistence example

Save and access browsing data across multiple sessions.

## What is this useful for?

Persistence is a feature that allows you to save and access browsing data across multiple sessions. This is useful for preserving logins, bookmarks, user data, cookies, local storage, etc. across multiple sessions. A saved session is called a "profile" and is identified by the ID of the session that it was initially saved from. Profiles are only saved when the session is closed.

## Usage

```js
// save the session when it's closed to a new profile
let profile = true;

let response = await fetch("https://engine.hyperbeam.com/v0/vm", {
  method: "POST",
  headers,
  body: JSON.stringify({ profile }),
});

// close session
await fetch(`https://engine.hyperbeam.com/v0/vm/${response.session_id}`, {
  method: "DELETE",
});

// the profile ID is the session ID of the intially saved session
const profile_id = response.session_id;

// simple usage:
// load from and save to existing profile
profile = profile_id;

// or
// advanced usage:
// "fork" a profile: load from existing profile but save to new profile
// the new session's ID is the forked profile ID
profile = {
  load: profile_id,
  save: true,
};

response = await fetch("https://engine.hyperbeam.com/v0/vm", {
  method: "POST",
  headers,
  body: JSON.stringify({ profile }),
});
```

## Steps

- Run `npm start` to launch the demo.
- You should be able to see the Hyperbeam virtual computer data being saved and accessed across multiple sessions.

## Need more help?

Send us an email at [support@hyperbeam.com](mailto:support@hyperbeam.com) or join our developer community [Discord server](https://discord.gg/D78RsGfQjq).
