# Anti Rickroll Chrome Extension

A simple chrome extension that blocks all of the recognized Rickroll videos
from YouTube, including the official 'Never Gonna Give You Up' by Rick Astley

> Not yet available in the Chrome Store

## How does it work?

Based on the [Chrome Extensions API](https://developer.chrome.com/docs/extensions/)

1. Maintains a list of well known Rickroll Youtube Links
2. Hooks a navigation listener for all navigation events (including history
push)
3. Checks whether the target URL belongs to one one well known URLs
    1. If yes, redirect to a static HTML page warning about the Rickroll

Additionally, a user configuration is provided to enable/disable Rickroll
protetion

## Usage

The extension is not available yet in the Chrome Store, but you may try it out
by following the steps given [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest)

## Contributions

Contributions are welcome in terms of increasing the known Rickroll URLs, issue
reporting, feature requests and code improvements.

> ⚠️ No exposure to *Never Gonna Give You Up* for long duration may cause
sadness. Make sure to check out the song ocassionally.

If you have any questions, feel free to reach out to me [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)