import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'church-ui-app';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminMenu = false;
  showTreasurerMenu = false;
  showMembershipMenu = false;
  id?: number;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminMenu = this.roles.includes('ROLE_ADMIN');
      this.showTreasurerMenu = this.roles.includes('ROLE_TREASURER');
      this.showMembershipMenu = this.roles.includes('ROLE_MEMBERSHIP');

      this.id = user.id;
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }  
}
