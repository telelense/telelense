import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() backRoute = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

  back() {
    if (!this.backRoute) {
      return;
    }

    const temp = this.backRoute.split('?');
    if (temp.length === 0) {
      return;
    }
    const path = temp[0].split('/').filter($0 => $0.length > 0);
    const query = temp.length > 1 ? temp[1].split('&').reduce((v: any, c) => {
      const temp = c.split('=');
      if (temp.length === 2) {
       v[temp[0]] = temp[1];
      }
      return v;
    }, {}) : {};
    this.router.navigate(path, { queryParams: query });
  }

}
