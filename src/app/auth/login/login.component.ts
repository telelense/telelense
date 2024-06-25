import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.googleSignIn().then((s) => {
      const redirectUri = this.authService.redirectUri;
      if(!!redirectUri) {
        this.authService.redirectUri = '';
        this.router.navigate([redirectUri]);
      } else if (this.authService.storedUri.length > 0) {
        this.router.navigate([this.authService.storedUri]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    this.authService.signOut();
  }

}
