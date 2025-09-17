import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsConditionsDialogComponent } from 'app/components/terms-conditions-dialog/terms-conditions-dialog.component';
import { DialogsTerms } from 'app/shared/models/dialog.class';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
  }

  constructor(
    public configService: ConfigurationService,
    public dialog: MatDialog,
    public storageService: StorageService,
    public homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configService.assignInitialItemMenu();
    const storage = this.storageService.getAllSettings()
    if(!storage.user?.acceptTerms){
      this.viewTermsConditions()
    }
  }

  public viewTermsConditions() {
    const dialog = this.dialog.open(TermsConditionsDialogComponent, {
      data: new DialogsTerms(), width: '450px'
    });

    dialog.afterClosed().subscribe(async result => {
      if (result != undefined) {
        if (result.action == 'accept') {
          this.configService.setLoadingPage(true);
          const user = this.storageService.getValue('user')
          await this.homeService.accept({accept_terms : true});
          user.acceptTerms = true;
          this.storageService.setValue('user', user)
          this.configService.setLoadingPage(false);
        }
      }
    });
  }

}
