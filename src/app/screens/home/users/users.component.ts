import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }



}
