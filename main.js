const offScreenFilePath = './offscreen.html';
let offscreenExists = false;

chrome.action.onClicked.addListener(() => {
  (async () => {
    const [{ url }] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });

    if (!offscreenExists) {
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

async function createOffscreen() {
  await chrome.offscreen.createDocument({
    url: offScreenFilePath,
    reasons: ['CLIPBOARD'],
    justification: 'Required for write to clipboard',
  });
  offscreenExists = true;
}
