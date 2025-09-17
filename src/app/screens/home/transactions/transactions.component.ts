import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  public transactionsMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
    public storageService: StorageService,
    public homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.transactionsMenu = this.configService.menu.filter(
      (item) => item.url === 'transactions'
    )[0];
    this.assignInitialTransactionsMenu();

    try {
      const account = this.storageService.getValue('user');
      this.homeService.getBalances().then(async (balances) => {
        const _balances = balances.filter(
          (balance: any) => balance.username === account.username
        );
        this.homeService.uploadBalances(_balances);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public assignInitialTransactionsMenu() {
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[2];
      this.transactionsMenu.children.forEach((element: any) => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true;
        }
      });
      this.configService.menu.forEach((item) => {
        if (item.url === 'transactions') {
          item = this.transactionsMenu;
        }
      });
    }, 200);
  }

  public changeMenu(item: any) {
    this.transactionsMenu.children = this.transactionsMenu.children.map(
      (data: any) => {
        return { ...data, select: false };
      }
    );

    this.transactionsMenu.children.forEach((data: any) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });

    this.configService.menu.forEach((item) => {
      if (item.url === 'transactions') {
        item = this.transactionsMenu;
      }
    });

    this.router.navigate([`/home/transactions/${item.url}`]);
  }
}
