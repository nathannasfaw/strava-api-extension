document.getElementById('connect-strava').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'authenticate' });
  });
  