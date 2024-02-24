const offScreenFilePath = 'offscreen.html';

chrome.action.onClicked.addListener(() => {
  (async () => {
    const [{ url }] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });

    if (!(await offscreenExists())) {
      await createOffscreen();
    }

    if (typeof url === "string") {
      await chrome.runtime.sendMessage({
        target: 'offscreen',
        url: url
      });
    }
  })().catch(err => {
    console.log(err)
  })
})

async function offscreenExists() {
  const matchedClients = await clients.matchAll();
  console.log(matchedClients)
  for (const client of matchedClients) {
    if (client.url.endsWith(offScreenFilePath)) {
      return true;
    }
  }
  return false;
}

async function createOffscreen() {
  await chrome.offscreen.createDocument({
    url: offScreenFilePath,
    reasons: ['CLIPBOARD'],
    justification: 'Required for write to clipboard',
  });
}
