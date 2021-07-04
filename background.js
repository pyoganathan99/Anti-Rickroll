const wellKnownRickrollIds = new Set([

    // If you are looking at this, help us expand this list!

    'dQw4w9WgXcQ', // Rick Astley Official - Never Gonna Give You Up
    'O91DT1pR1ew', // CB2C - get rickrolled lol
    'oHg5SJYRHA0', // cotter548 - RickRoll'D
    'ub82Xb1C8os', // Juicebox Hero - Rick roll but with a different link so people can’t memorize it (read description)
    'YddwkMJG1Jo', // Rick roll, but with a different link - Rick roll, but with a different link
    'bxqLsrlakK8', // Revideo - Rick Astley - Never Gonna Give You Up (Remastered 4K 60 FPS 1 minute version)
]);

const settings = {};
loadSettings(settings);

/**
 * Identifies whether the given URL is a YouTube URL
 * for any well known Rickroll videos
 * 
 * @param {string} urlStr Any fully qualified URL including all query params
 * @returns {boolean} true if it is an identified Rickroll URL
 */
function isRickroll(urlStr) {
    const url = new URL(urlStr);

    if (url.host !== 'www.youtube.com') {
        return false;
    }

    if (!url.searchParams.has('v')) {
        return false;
    }

    const videoId = url.searchParams.get('v');
    return wellKnownRickrollIds.has(videoId);
}

/**
 * Handler for any navigation/redirects. Checks whether the given URL is a 
 * recognized Rickroll URL, and if so redirects the tab to the safe page.
 * 
 * Note: The Chrome Extensions API prefers that this be an arrow function.
 */
const handleNavigation = ({ tabId, url }) => {
    console.log(`Handler invoked for URL: [${url}]`);

    if (!settings.enabled) {
        console.log('Rickroll protection disabled');
        return;
    }

    if (isRickroll(url)) {
        console.log('Rickroll detected, redirecting to safe page');
        chrome.tabs.update(tabId, {
            url: chrome.runtime.getURL('src/alternate_view/index.html')
        });
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(handleNavigation);
chrome.webNavigation.onHistoryStateUpdated.addListener(handleNavigation);

chrome.storage.sync.onChanged.addListener(({ enabled }) => {
    console.log('Settings updated by user');
    settings.enabled = enabled;
});

/**
 * Gets the settings stored in the Extension API Sync storage and populates
 * them in the given settings object.
 * Creates the default settings if not already present.
 * 
 * @param {Object} settings The settings object
 */
function loadSettings(settings) {
    chrome.storage.sync.get('enabled', ({ enabled }) => {
        if (enabled === undefined) {
            console.log('Settings not found, inserting default settings');

            settings.enabled = true;
            chrome.storage.sync.set(settings);

            return;
        }

        console.log('Loaded existing setting', { enabled });
        settings.enabled = enabled;
    });
}
