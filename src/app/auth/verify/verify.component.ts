import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  displayName = ''

  constructor(
    private authService: AuthService,
  ) {
    authService.user$.subscribe(user => {
      if (user !== null) {
        this.displayName = user.displayName ?? ''
      }
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut();
  }

}
