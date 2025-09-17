import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  public notifications: number = 0;
  public profile = this.storageService.getValue('user')

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
  }

  goAlarms(){
    this.router.navigate([`alarms`]);
  }


  logOut() {
    this.authService.logout();
  }
}
