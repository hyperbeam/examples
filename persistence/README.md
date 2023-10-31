# Hyperbeam Persistence example

Save and access browser data across multiple sessions.

## What is this useful for?

Persistence is a feature that allows you to save and access browser data across multiple sessions. This is useful for preserving logins, bookmarks, user data, cookies, local storage, etc. across multiple sessions.

## Usage

```ts

// Server
const response = await axios.post("https://engine.hyperbeam.com/v0/vm", {
  profile: "1d2df225-e1c5-4d94-8b95-1c6e75ef04ea" // Pass the session ID to load the session and overwrite it when the session is over"
  
}, { headers });


```

## Advanced Usage

Other than profile you can utilize the load and save properties.

Load - Loads the last session state. For example, if you opened up Youtube
in your last session, Youtube would still be opened up in your new session.

Save - Overwrites the last session state. If you use save in combination
with load and proceeded to watch a Youtube video it will overwrite the session
for the time stamp of the video in which you ended the session.         



## Example of Advanced Usage

```ts

// Server
const response = await axios.post("https://engine.hyperbeam.com/v0/vm", {
  profile: { 
    load: "1d2df225-e1c5-4d94-8b95-1c6e75ef04ea" // Load the last session state 
    save: "1d2df225-e1c5-4d94-8b95-1c6e75ef04ea" // Overwrite the current session state
  }
}, { headers });


```

## cURL Request Examples 

```ts

//Standard

1 ~ curl -X POST \                                                                                   
  -H "Authorization: Bearer $HB_API_KEY" \                               
  https://engine.hyperbeam.com/v0/vm --data '{"profile": true}'
{"session_id":"1d2df225-e1c5-4d94-8b95-1c6e75ef04ea","embed_url":"https://ctowmpnrcyxcvk1dnrgwgwp74.hyperbeam.com/HS3yJeHFTZSLlRxude8E6g?token=Ah1BDpMQZLaBQ_SAOA8E72jSjPVG1yMtElmm8dUBLjE","admin_token":"PgnA79dfr2QqYLLJvDu5PvibvbcsGlx8n264s6ufA0g"}
2  ~ curl -X DELETE \
  -H "Authorization: Bearer $HB_API_KEY" \
  https://engine.hyperbeam.com/v0/vm/1d2df225-e1c5-4d94-8b95-1c6e75ef04ea
{"session_id":"1d2df225-e1c5-4d94-8b95-1c6e75ef04ea"}
3  ~ curl -X POST \  
  -H "Authorization: Bearer $HB_API_KEY" \
  https://engine.hyperbeam.com/v0/vm --data '{"profile": "1d2df225-e1c5-4d94-8b95-1c6e75ef04ea"}'
{"session_id":"85ed5c92-8ac3-4bd6-95b5-cd9ea5cab55a","embed_url":"https://ctowmpnrcyxcvk1dnrgwgwp74.hyperbeam.com/he1ckorDS9aVtc2epcq1Wg?token=J5O9fkTaqO2DuELAk-GtumxQ-1_qeCVJzlIJTfs13Jo","admin_token":"LbGxVjbqTjNjkjtGXN5QH_4qMx7AAE7y9a58JLDH09w"}

1. Profile: true -> Make sure to save a new profile
2. Delete the session
3. Pass 1d2df225-e1c5-4d94-8b95-1c6e75ef04ea (the session id from step 1) to load the profile, and also overwrite it when the session is over

// Advanced

1  ~ curl -X POST \                                                                                   
  -H "Authorization: Bearer $HB_API_KEY" \                               
  https://engine.hyperbeam.com/v0/vm --data '{"profile":{"save": true}}'
{"session_id":"5dd3715d-bbf3-4be6-9b55-575201b9c649","embed_url":"https://ctowmpnrcyxcvk1dnrgwgwp74.hyperbeam.com/XdNxXbvzS-abVVdSAbnGSQ?token=BHF0uyT5Z01gNonsi7LTbg0kjMBAKidp4uo0pkg8Rso","admin_token":"WyiZJ8OdjqDK5zZrd79tU8LfSGLYl24R1wLHIZPhmlE"}
2  ~ curl -X DELETE \
  -H "Authorization: Bearer $HB_API_KEY" \
  https://engine.hyperbeam.com/v0/vm/5dd3715d-bbf3-4be6-9b55-575201b9c649                                                                     
{"session_id":"5dd3715d-bbf3-4be6-9b55-575201b9c649"}
3  ~ curl -X POST \  
  -H "Authorization: Bearer $HB_API_KEY" \
  https://engine.hyperbeam.com/v0/vm --data '{"profile":{"save": "5dd3715d-bbf3-4be6-9b55-575201b9c649", "load": "5dd3715d-bbf3-4be6-9b55-575201b9c649"}}'
{"session_id":"d2a5c0a6-58c9-4747-a887-1b6b7eaf0db5","embed_url":"https://ctowmpnrcyxcvk1dnrgwgwp74.hyperbeam.com/0qXApljJR0eohxtrfq8NtQ?token=6olWyzf_t4G2rZWfW1KiLArBDE_vw7Qih0n8tgOcGe0","admin_token":"HB0EZrtJtMVQ2HbpXcNz_3hgLbBmU3c_xvXeWkAnfP4"}

1. Create a session, and i save it using save: true (create a new save)
2. Delete the session
3. Create a session, with save and load both set to the session ID of the original session. Setting load to the session ID saves it, and setting save to the session id overwrites it.


```

## Steps
- Contact dev@hyperbeam.com to change your API permissions to enable persistence.
- Use `npm install` to install the dependencies altogether and navigate to the examples you want to run for more information.
- Set your API key by running the following command in your terminal:

```bash

## Notes

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
