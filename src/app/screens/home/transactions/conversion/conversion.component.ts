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
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit {
  @ViewChild('myFormConversion', { static: false }) myFormConversion:
    | NgForm
    | undefined;

  public balance: any;
  public conversionForm: FormGroup;
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

  constructor(
    public configService: ConfigurationService,
    private transactionsService: TransactionsService,
    public homeService: HomeService,
    private fb: FormBuilder,
    public storageService: StorageService,
    private numberFormatPipe: ShowThounsandDecimalsPipe
  ) {
    this.conversionForm = this.fb.group({
      account1: [''],
      account2: [''],
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

  public async select2(item: any) {
    this.account2 = item.value.name;
  }

  public sendForm() {
    if (!this.conversionForm?.valid) {
      this.configService.validationError();
      return;
    }
    const { value } = this.conversionForm?.value;
    this.conversion = {
      username: this.storageService.getValue('user').username,
      current_currency: this.account1,
      destination_currency: this.account2,
      account_number: this.balance.find(
        (x: any) => this.account1 === x.account_type
      ).account_number,
      account_number_destination: this.balance.find(
        (x: any) => this.account2 === x.account_type
      ).account_number,
      observation: value,
    };


    let amount = Number(this.conversion.observation.replaceAll('.', '').replaceAll(',', '.'));
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
      Subject: 'Solicitud conversion',
      Body: `<div> <h1>Solicitud conversion</h1> <br>
      <p><b>Tipo de cuenta de origen: </b>${this.conversion.current_currency}</p>
      <p><b>Tipo de cuenta de destino: </b>${this.conversion.destination_currency}</p>
      <p><b>Numero de cuenta de origen: </b>${this.conversion.account_number}</p>
      <p><b>Numero de cuenta de destino: </b>${this.conversion.account_number_destination}</p>
      <p><b>Valor: </b>${this.conversion.observation}</p>
      <p><b>usuario: </b>${this.conversion.username}</p>
      </div> `,
    }).then((message: any) => {
      alert(message);
      this.conversionForm.reset();
    });

    // return this.transactionsService
    //   .sendConversion(conversion)
    //   .then()
    //   .finally(() => {
    this.configService.setLoadingPage(false);
    //   });
  }
}
