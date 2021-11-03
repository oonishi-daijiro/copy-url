chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.getSelected((tab) => {
    let url;
    url = tab.url;
    const put_url = document.createElement('div');
    const put_text = document.createTextNode(url);
    put_url.appendChild(put_text);
    document.body.appendChild(put_url);
    put_url.id = "url"
    const sentvalue = document.getElementById('url');
    document.getSelection().selectAllChildren(sentvalue);
    document.execCommand('copy');
    put_url.remove();
  })
});
