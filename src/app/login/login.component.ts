import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private authService: SpotifyAuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login();
  }
}
