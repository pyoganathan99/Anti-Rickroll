const wellKnownRickrollIds = new Set([

    // If you are looking at this, help us expand this list!

    'dQw4w9WgXcQ', // Rick Astley Official - Never Gonna Give You Up
    'O91DT1pR1ew', // CB2C - get rickrolled lol
    'oHg5SJYRHA0', // cotter548 - RickRoll'D
    'ub82Xb1C8os', // Juicebox Hero - Rick roll but with a different link so people can’t memorize it (read description)
    'YddwkMJG1Jo', // Rick roll, but with a different link - Rick roll, but with a different link
    'bxqLsrlakK8', // Revideo - Rick Astley - Never Gonna Give You Up (Remastered 4K 60 FPS 1 minute version)
]);

let extensionEnabled = false;

chrome.webNavigation.onBeforeNavigate.addListener(handler);
chrome.webNavigation.onHistoryStateUpdated.addListener(handler);

console.log('Loading settings');

chrome.storage.sync.get('enabled', ({ enabled }) => {
    if (enabled === undefined) {
        console.log('Settings not found, updating default');

        extensionEnabled = true;
        chrome.storage.sync.set({ enabled: true });
    } else {
        console.log('Loaded existing setting', { enabled });
        extensionEnabled = enabled;
    }
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension startup');

    console.log(document);

    chrome.storage.sync.get('enabled', ({ enabled }) => {
        extensionEnabled = enabled === undefined || enabled;
    });
});

chrome.storage.sync.onChanged.addListener(({ enabled }) => {
    console.log('Setting toggled');

    extensionEnabled = enabled.newValue;
});

function handler ({ tabId, url }) {
    if (!extensionEnabled) { return; }

    const params = new URL(url).searchParams;

    if (!params.has('v')) { return; }

    const videoId = params.get('v');
    if (!wellKnownRickrollIds.has(videoId)) { return; }

    chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('src/alternate_view/index.html')
    });
}
