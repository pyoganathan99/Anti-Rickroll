const enableSwitch = document.getElementById('enable-switch');
const statusText = document.getElementById('status-text');

const settings = {
    set enabled (state) {
        enableSwitch.checked = Boolean(state);
        updateStatusText();
    },
    get enabled () {
        return enableSwitch.checked;
    }
}

function updateStatusText() {
    statusText.innerHTML = settings.enabled ? 'You are protected' : 'Not protected';
}

window.addEventListener('load', () => {
    chrome.storage.sync.get('enabled', ({ enabled }) => {
        settings.enabled = enabled === undefined || enabled;
    });
});

enableSwitch.addEventListener('change', () => {
    updateStatusText();
    chrome.storage.sync.set({
        enabled: enableSwitch.checked,
    });
});
