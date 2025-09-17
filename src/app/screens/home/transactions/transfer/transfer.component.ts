import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { HomeService } from '../../home.service';
import {
  AccountTypeBtc,
  AccountTypeEth,
  AccountTypeUsd,
  AccountTypeUsdt,
} from 'app/shared/models/account-type';
import { StorageService } from 'app/shared/services/storage.service';
import { TransactionsService } from '../transactions.service';
import './../../../../../assets/js/smtp.js';
import { environment } from 'environments/environment';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';
declare let Email: any;


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  @ViewChild('myFormConversion', { static: false }) myFormConversion:
    | NgForm
    | undefined;

  public balance: any;
  public transactionForm: FormGroup;
  public account1: any;
  public valueAccount: any;
  public listAccounts = [
    new AccountTypeBtc(),
    new AccountTypeUsdt(),
    new AccountTypeEth(),
    new AccountTypeUsd(),
  ];
  public error: boolean = false;
  transaction: any;

  constructor(
    public configService: ConfigurationService,
    private transactionsService: TransactionsService,
    public homeService: HomeService,
    private fb: FormBuilder,
    public storageService: StorageService,
    private numberFormatPipe: ShowThounsandDecimalsPipe
  ) {
    this.transactionForm = this.fb.group({
      account1: [''],
      username: [''],
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
    if (!this.transactionForm?.valid) {
      this.configService.validationError();
      return;
    }
    const { value, username } = this.transactionForm?.value;
    this.transaction = {
      username: this.storageService.getValue('user').username,
      current_currency: this.account1,
      destination_username: username,
      account_number: this.balance.find(
        (x: any) => this.account1 === x.account_type
      ).account_number,
      observation: value,
    };

    let amount = Number(this.transaction.observation.replaceAll('.', '').replaceAll(',', '.'));
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
      Subject: 'Solicitud transferencia',
      Body: `<div> <h1>Solicitud transferencia</h1> <br>
      <p><b>Tipo de cuenta de origen: </b>${this.transaction.current_currency}</p>
      <p><b>Numero de cuenta de origen: </b>${this.transaction.account_number}</p>
      <p><b>Usuario de destino: </b>${this.transaction.destination_username}</p>
      <p><b>Valor: </b>${this.transaction.observation}</p>
      <p><b>usuario: </b>${this.transaction.username}</p>
      </div> `,
    }).then((message: any) => {
      alert(message);
      this.transactionForm.reset();
    });

    // return this.transactionsService
    //   .sendConversion(transaction)
    //   .then()
    //   .finally(() => {
    this.configService.setLoadingPage(false);
    //   });
  }


}
