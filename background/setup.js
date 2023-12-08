const SHORTCUTS_URL = "chrome://extensions/shortcuts"

if (!localStorage.setUpYetWithNewStuff) {
    chrome.windows.getLastFocused((window) => {
        // do not remove -- this is necessary for 2A users
        chrome.tabs.create({ windowId: window.id, url: SHORTCUTS_URL })
    });
    localStorage.setUpYetWithNewStuff = true
}

async function checkForNewRelease() {
    const response = await fetch('https://api.github.com/repos/pandadevv5495/skhelpfork/releases/latest');
    const data = await response.json();
    return data.tag_name;
}

async function initVersionCheck() {
    const latestVersion = await checkForNewRelease();
    const currentVersion = chrome.runtime.getManifest().version;
    if (latestVersion !== currentVersion) {
        chrome.runtime.sendMessage({ updateAvailable: true });
    }
}

initVersionCheck();
