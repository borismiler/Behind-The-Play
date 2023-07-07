import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { getCookie, setCookie } from 'typescript-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    console.log('getting authToken');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    setCookie('code', code);

    console.log('code', code);
    this.spotifyService.handleAuthCallback();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
