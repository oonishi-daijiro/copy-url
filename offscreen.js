
chrome.runtime.onMessage.addListener((req) => {
   console.log(req)
   if (req.target === 'offscreen') {
      const { url } = req;
      const urlContainner = document.createElement('div');
      const textContainner = document.createTextNode(url);
      urlContainner.appendChild(textContainner);
      document.body.appendChild(urlContainner);
      urlContainner.id = "url"
      const v = document.getElementById('url');
      document.getSelection().selectAllChildren(v);
      document.execCommand('copy');
      urlContainner.remove();
   }
})
