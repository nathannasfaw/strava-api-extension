const CLIENT_ID = 'YOUR_STRAVA_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_STRAVA_CLIENT_SECRET';
const REDIRECT_URI = chrome.identity.getRedirectURL(); // Automatically gets the extension’s redirect URL

function authenticate() {
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read,activity:read&approval_prompt=force`;
  chrome.identity.launchWebAuthFlow(
    { url: authUrl, interactive: true },
    (responseUrl) => {
      if (responseUrl) {
        const url = new URL(responseUrl);
        const authCode = url.searchParams.get('code');
        exchangeCodeForToken(authCode);
      }
    }
  );
}

function exchangeCodeForToken(code) {
  const tokenUrl = 'https://www.strava.com/oauth/token';
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code'
  });
  
  fetch(tokenUrl, {
    method: 'POST',
    body: params
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Access Token:', data.access_token);
    // Store the token securely and start using the Strava API
  });
}

// Call authenticate() when the user interacts with the extension