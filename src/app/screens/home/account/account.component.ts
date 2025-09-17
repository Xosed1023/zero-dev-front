import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { HomeService } from '../home.service';
import { AccountService } from './account.service';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('myAccountForm', { static: false }) myAccountForm:
    | NgForm
    | undefined;

  public balances: any = [];
  public account: any;
  public accountSelected: any = '';
  public transactions: any[] = [];
  public accountForm: FormGroup;
  public columns: string[] = ['date', 'id', 'description', 'value', 'status'];

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService,
    private fb: FormBuilder,
    public homeService: HomeService,
    public accountService: AccountService,
    public numberFormatPipe: ShowThounsandDecimalsPipe
  ) {
    this.accountForm = this.fb.group({
      account: [''],
    });
  }

  ngOnInit(): void {
    this.account =
      this.storageService.getValue('account') ??
      this.storageService.getValue('user');
    this.homeService.getBalances().then(async (balances) => {
      this.balances = balances.filter(
        (balance: any) => balance.username === this.account.username
      );
      if (this.balances.length > 0) {
        await this.select({ value: this.balances[0] });
        this.accountForm.setValue({
          account: this.accountSelected,
        });
      }
    });
  }

  ngOnDestroy() {
    this.storageService.setValue('account', '');
  }

  public async select(item: any) {
    this.accountSelected = item.value;

    this.accountSelected.balance = this.numberFormatPipe.transform(this.accountSelected.balance)
    this.accountSelected.cupo = this.numberFormatPipe.transform(this.accountSelected.cupo)

    const result = await this.accountService.getTransaction();
    this.transactions = result
      .filter((x: any) => x.username === this.account.username)
      .map((x: any) => {
        return {
          ...x,
          movement_date: moment(x.movement_date).format('YYYY-MM-DD'),
        };
      });
    this.transactions = this.transactions.filter(
      (x: any) => x.currency_operation === this.accountSelected.account_type
    );
  }
}
