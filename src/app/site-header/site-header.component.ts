import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'shop-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  user: User | null = null;
  showSignOutMenu : boolean = false;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: user => this.user = user,
    })
  }

  toggleSignOutMenu(): void {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    
  }
}
