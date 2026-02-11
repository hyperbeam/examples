# Hyperbeam examples

![Discord online count](https://img.shields.io/discord/966073020336734308?style=flat) ![Issue count](https://img.shields.io/github/issues/hyperbeam/examples?style=flat) ![License](https://img.shields.io/github/license/hyperbeam/examples?style=flat) ![GitHub language count](https://img.shields.io/github/languages/count/hyperbeam/examples?style=flat) ![GitHub contributors](https://img.shields.io/github/contributors/hyperbeam/examples?style=flat)

This repository contains examples of how to use the Hyperbeam API.

## Steps

Use `npm install` to install the dependencies altogether and navigate to the examples you want to run for more information.
Set your API key by running the following command in your terminal:

```bash

# Linux/macOS
export HB_API_KEY=your_api_key

# Windows
set HB_API_KEY=your_api_key
```

Replace `your_api_key` with your API key from the [Hyperbeam dashboard](https://hyperbeam.com/dashboard).

Do note that Windows support is untested and likely incomplete (e.g. `curl` behaving differently, symlinks), please use Windows Subsystem for Linux (WSL) as your dev environment.

## Examples

## [**Multi cursor**](./multicursor)
Interact with multiple users controlling the Hyperbeam virtual computer simultaneously in realtime.

## [**Persistence**](./persistence)
Save and access browsing data across multiple sessions.

## [**Resize**](./resize)
Resize and reposition the Hyperbeam virtual computer window dynamically.

## [**Zoom**](./zoom)
Zoom in and out of all tabs or individual ones.

## [**Embed in Chrome Extension**](./embed-in-chrome-extension)
Upload and use a custom Chrome extension in the Hyperbeam virtual computer.

## [**Load custom Chrome Extension**](./load-custom-chrome-extension)
Upload and use a custom Chrome extension in the Hyperbeam virtual computer.

## [**Timeout**](./timeout)
Bring down costs and add quickly add paywalls using timeouts.

## [**React Native**](./timeout)
Use Hyperbeam virtual computer in a React Native app.

## [**AudioContext**](./audio-context)
Use the AudioContext API to customize the audio output of the Hyperbeam virtual computer.

## [**Audio visualization**](./audio-context)
Use the WebAudio API to visualize audio
