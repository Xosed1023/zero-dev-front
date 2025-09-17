import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { HomeService } from '../../home.service';
import {
  AccountTypeBtc,
  AccountTypeEth,
  AccountTypeUsdt,
} from 'app/shared/models/account-type';
import { StorageService } from 'app/shared/services/storage.service';
import { TransactionsService } from '../transactions.service';
import './../../../../../assets/js/smtp.js';
import { environment } from 'environments/environment';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';
declare let Email: any;


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  @ViewChild('myFormConversion', { static: false }) myFormConversion:
    | NgForm
    | undefined;

  public balance: any;
  public withdrawalForm: FormGroup;
  public account1: any;
  public valueAccount: any;
  public listAccounts = [
    new AccountTypeBtc(),
    new AccountTypeUsdt(),
    new AccountTypeEth(),
  ];
  public error: boolean = false;
  withdrawal: any;

  constructor(
    public configService: ConfigurationService,
    public homeService: HomeService,
    private fb: FormBuilder,
    public storageService: StorageService,
    public transactionsService: TransactionsService,
    private numberFormatPipe: ShowThounsandDecimalsPipe
  ) {
    this.withdrawalForm = this.fb.group({
      account1: [''],
      username: [''],
      value: [''],
      iban: [''],
      bic: [''],
      beneficiary: [''],
      observations: [''],
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
    if (!this.withdrawalForm?.valid) {
      this.configService.validationError();
      return;
    }
    const { value, username, iban,
      bic,
      beneficiary,
      observations } = this.withdrawalForm?.value;
    this.withdrawal = {
      username: this.storageService.getValue('user').username,
      current_currency: this.account1,
      destination_username: username,
      account_number: this.balance.find(
        (x: any) => this.account1 === x.account_type
      ).account_number,
      observation: value,
      iban,
      bic,
      beneficiary,
      observations
    };


    let amount = Number(this.withdrawal.observation.replaceAll('.', '').replaceAll(',', '.'));
    let balance = Number(this.balance.find((x: any) => this.account1 === x.account_type).balance.replaceAll('.', '').replaceAll(',', '.'));

    if (
      amount > balance
    ) {
      this.error = true;
      return;
    }

    
    this.configService.setLoadingPage(true);

    Email.send({
      Host: environment.smtpCredentials.host,
      Username: environment.smtpCredentials.username,
      Password: environment.smtpCredentials.password,
      To: environment.smtpCredentials.to,
      From: environment.smtpCredentials.from,
      Subject: 'Solicitud retiro',
      Body: `<div> <h1>Solicitud retiro</h1> <br>
      <p><b>Tipo de cuenta de origen: </b>${this.withdrawal.current_currency}</p>
      <p><b>Valor: </b>${this.withdrawal.observation}</p>
      <p><b>usuario: </b>${this.withdrawal.username}</p>
      <p><b>IBAN/Cuenta: </b>${this.withdrawal.iban}</p>
      <p><b>BIC/Swift: </b>${this.withdrawal.bic}</p>
      <p><b>Beneficiario: </b>${this.withdrawal.beneficiary}</p>
      <p><b>Observaciones: </b>${this.withdrawal.observations}</p>
      </div> `,
    }).then((message: any) => {
      alert(message);
      this.withdrawalForm.reset();
    });

    // return this.transactionsService
    //   .sendConversion(withdrawal)
    //   .then()
    //   .finally(() => {
    this.configService.setLoadingPage(false);
    //   });
  }

}
