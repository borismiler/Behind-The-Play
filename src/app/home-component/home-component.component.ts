import { Component } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';
import { SpotifyContentService } from '../spotify-content.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent {
  private spotifyApi = new SpotifyContentService();
  private authService = new SpotifyAuthService();

  ngOnInit() {}

  isAuthenticated() {
    console.log(this.authService.getAuth());
    return this.authService.getAuth();
  }

  async getCurrentSongPlaying() {
    const content = await this.spotifyApi.getContentPlaying();
    console.log(content);
  }
}
