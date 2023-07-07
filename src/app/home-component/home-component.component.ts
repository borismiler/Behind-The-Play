import { Component } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SpotifyContentService } from '../spotify-content.service';
import { TrackItem } from '../../model/spotifyTypes';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent {
  constructor(
    private spotifyService: SpotifyService,
    private spotifyApi: SpotifyContentService
  ) {}

  ngOnInit() {}

  isAuthenticated() {
    return this.spotifyService.getAuth();
  }

  async getCurrentSongPlaying() {
    console.log('start');
    const currTrack: TrackItem | undefined =
      await this.spotifyApi.getContentPlaying();
    console.log('end');
    console.log(currTrack);
  }
}
