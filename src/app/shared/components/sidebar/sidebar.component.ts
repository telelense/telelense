import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userImage = '';
  userName = '';

  constructor(
    private authService: AuthService,
  ) {
    authService.user$.subscribe(user => {
      this.userName = user?.displayName ?? '';
      this.userImage = user?.photoURL ? `url(${user?.photoURL})` : '';
    })
  }

  ngOnInit(): void {
  }

}
