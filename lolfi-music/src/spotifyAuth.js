// spotifyAuth.js

export const authenticateSpotify = () => {
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/callback';
    const scopes = [
      'playlist-read-private',
      'user-library-read',
    ];
  
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes.join(
      '%20'
    )}&redirect_uri=${redirectUri}`;
  
    window.location = authUrl;
  };
  