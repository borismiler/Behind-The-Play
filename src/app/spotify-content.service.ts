import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyContentService {
  private spotifyService: SpotifyWebApi;
  private authService: SpotifyAuthService;
  constructor() {
    this.authService = new SpotifyAuthService();
    this.spotifyService = this.authService.getAuthenticatedApi();
  }

  async getContentPlaying() {
    let x = {};
    await this.spotifyService.getMyCurrentPlayingTrack().then((response) => {
      x = response;
    });

    return x;
  }
}
