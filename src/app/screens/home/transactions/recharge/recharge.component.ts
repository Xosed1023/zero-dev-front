import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AccountTypeBtc, AccountTypeUsdt, AccountTypeEth, AccountTypeUsd } from 'app/shared/models/account-type';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { HomeService } from '../../home.service';
import { TransactionsService } from '../transactions.service';
import { environment } from 'environments/environment';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';
declare let Email: any;

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent {
  @ViewChild('myFormConversion', { static: false }) myFormConversion:
    | NgForm
    | undefined;

  public balance: any;
  public rechargeForm: FormGroup;
  public account1: any;
  public account2: any;
  public valueAccount: any;
  public listAccounts = [
    new AccountTypeBtc(),
    new AccountTypeUsdt(),
    new AccountTypeEth(),
    new AccountTypeUsd(), 
  ];
  public error: boolean = false;
  conversion: any;
  public formSended: boolean = false;

  constructor(public configService: ConfigurationService,
    private transactionsService: TransactionsService,
    public homeService: HomeService,
    private fb: FormBuilder,
    public storageService: StorageService,
    private numberFormatPipe: ShowThounsandDecimalsPipe) {
    this.rechargeForm = this.fb.group({
      account1: [''],
      cardNumber: [''],
      value: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.homeService.balances$.subscribe((balance: any[]) => {
      if (balance) {
        this.balance = balance.map((bal: any) => {
          return {
            ...bal,
            balance: this.numberFormatPipe.transform(bal.balance),
          }
        });
      }
    });
  }

  public async select(item: any) {
    this.account1 = item.value.name;
    this.valueAccount = this.balance.find(
      (x: any) => this.account1 === x.account_type
    ).balance;
  }

  public sendForm() {
    this.formSended = true;
    if (!this.rechargeForm?.valid) {
      this.configService.validationError();
      return;
    }
    const { account1, cardNumber, value } = this.rechargeForm?.value;
    this.configService.setLoadingPage(true);

    Email.send({
      Host: environment.smtpCredentials.host,
      Username: environment.smtpCredentials.username,
      Password: environment.smtpCredentials.password,
      To: environment.smtpCredentials.to,
      From: environment.smtpCredentials.from,
      Subject: 'Solicitud de recarga de tarjeta',
      Body: `<div> <h1>Solicitud de recarga de tarjeta</h1> <br>
      <p><b>Cuenta de origen: </b>${account1.name}</p>
      <p><b>Número de tarjeta: </b>${cardNumber}</p>
      <p><b>Valor: </b>${value}</p>
      <p><b>Usuario: </b>${this.storageService.getValue('user').username}</p>
      </div> `,
    }).then((message: any) => {
      alert(message);
      this.rechargeForm.reset();
    });

    this.configService.setLoadingPage(false);
  }
}
