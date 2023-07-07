import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import { CurrentPlaybackResponse, TrackItem } from '../model/spotifyTypes';
import { setCookie } from 'typescript-cookie';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyContentService {
  private spotifyContentApi: SpotifyWebApi;
  constructor(private authenticateSpotifyService: SpotifyService) {
    this.spotifyContentApi = authenticateSpotifyService.getAuthenticatedApi();
  }
  async getContentPlaying(): Promise<TrackItem | undefined> {
    let currTrack: TrackItem | undefined = undefined;

    await this.spotifyContentApi.getMyCurrentPlayingTrack().then((res) => {
      currTrack = res.body.item as TrackItem;
    });

    return currTrack;
  }
}
