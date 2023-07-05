import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import { generateRandomString } from './utils';

import SpotifyWebApiServer from '../../node_modules/spotify-web-api-node/src/server-methods.js';
import { getCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  public spotifyApi: SpotifyWebApi;
  private clientId: string = '0753f966a4364d5a8c3c8b997aab6a25';
  private clientSecret: string = '771651bb9ddd4628868118ae8f2ae061';
  private redirectUri: string = 'http://localhost:4200/callback';
  private scope = [
    'ugc-image-upload',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-follow-read',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
  ];
  private state = generateRandomString(32);
  private authUrl: string = '';
  private authToken: string | undefined = '';

  constructor() {
    (
      SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void }
    )._addMethods(SpotifyWebApiServer);
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.redirectUri,
    });
    this.authToken = getCookie('authToken');
    if (this.authToken) {
      this.spotifyApi.setAccessToken(this.authToken);
    }
    this.authUrl = this.spotifyApi.createAuthorizeURL(this.scope, this.state);
    console.log(this.authUrl);
  }

  getAuth() {
    return !!this.spotifyApi.getAccessToken();
  }

  login() {
    console.log('logging in');
    window.location.href = this.authUrl;
  }

  handleAuthCallback() {
    const code = getCookie('code');

    if (code) {
      this.spotifyApi.authorizationCodeGrant(code).then(
        (data) => {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);

          // Set the access token on the API object to use it in later calls
          this.spotifyApi.setAccessToken(data.body['access_token']);
          this.spotifyApi.setRefreshToken(data.body['refresh_token']);

          setCookie('authToken', data.body['access_token']);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }

  getInfo() {
    console.log(this.spotifyApi.getAccessToken());
    this.spotifyApi.getMe().then((data) => {
      console.log(data);
    });
  }
  getAuthenticatedApi() {
    return this.spotifyApi;
  }

  setAuthToken(token: string) {
    this.spotifyApi.setAccessToken(token);
  }

  setRefreshToken(token: string) {
    this.spotifyApi.setRefreshToken(token);
  }

  private getAccessTokenFromUrl(): string | null {
    const hash = window.location.hash.substr(1);
    const queryParams = new URLSearchParams(hash);
    return queryParams.get('access_token');
  }
}
