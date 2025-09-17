import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { StorageService } from 'app/shared/services/storage.service';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public balances: any = [];

  constructor(public homeService: HomeService, private storageSvc: StorageService,
    private numberFormatPipe: ShowThounsandDecimalsPipe) { }

  ngOnInit(): void {
    this.homeService.getBalances().then(balances => {
      this.balances = balances
        .map((balance: any) => ({
          ...balance,
          balance: this.numberFormatPipe.transform(balance.balance),
          cupo: this.numberFormatPipe.transform(balance.cupo),
        }))
        .filter((balance: any) => balance.username === this.storageSvc.getValue('user').username);
    });
  }

}
