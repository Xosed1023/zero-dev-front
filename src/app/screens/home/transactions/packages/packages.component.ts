import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PackageTypeBasic,
  PackageTypeOro,
  PackageTypePlatino
} from 'app/shared/models/package-type';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { environment } from 'environments/environment';
import '../../../../../assets/js/smtp.js';
import { HomeService } from '../../home.service';
declare let Email: any;


@Component({
  selector: 'app-transfer',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent {
  public transactionForm: FormGroup;
  public selectedPackage: any;
  public listPackages = [
    new PackageTypeBasic(),
    new PackageTypeOro(),
    new PackageTypePlatino(),
  ];
  public error: boolean = false;
  public paymentMethods: any[] = [{
    value: 'Efectivo',
    viewValue: 'Efectivo',
  },
  {
    value: 'Transferencia',
    viewValue: 'Transferencia',
  },
  {
    value: 'Criptomonedas',
    viewValue: 'Criptomonedas',
  }];

  public packagesData: any = [{
    id: this.listPackages[0],
    name: 'PAQUETE BASIC',
    from: 'Desde $10.000 hasta $50.000',
    rentability: '3% MENSUAL',
    min: 'Minimo: $ 10.000',
    max: 'Maximo: $ 50.000',
    gains: 'Ganancia: 3%',
    duration: 'Duración: 356 días',
  },
  {
    id: this.listPackages[1],
    name: 'PAQUETE ORO',
    from: 'Desde $51.000 hasta $100.000',
    rentability: '5% MENSUAL',
    min: 'Minimo: $ 51.000',
    max: 'Maximo: $ 350.000',
    gains: 'Ganancia: 5%',
    duration: 'Duración: 356 días',
  },
  {
    id: this.listPackages[2],
    name: 'PAQUETE PLATINO',
    from: 'Desde $101.000 hasta $500.000',
    rentability: '7% MENSUAL',
    min: 'Minimo: $ 351.000',
    max: 'Maximo: $ 1.000.000',
    gains: 'Ganancia: 7%',
    duration: 'Duración: 356 días',
  }]


  constructor(
    public configService: ConfigurationService,
    public homeService: HomeService,
    private fb: FormBuilder,
    public storageService: StorageService
  ) {
    this.transactionForm = this.fb.group({
      package: [''],
      wtp: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });
  }

  public async select(item: any) {
    this.selectedPackage = this.packagesData.find((x: any) => x.id.name === item.value.name);
  }

  public sendForm() {
    if (!this.transactionForm?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);

    const { wtp, value } = this.transactionForm?.value;

    Email.send({
      Host: environment.smtpCredentials.host,
      Username: environment.smtpCredentials.username,
      Password: environment.smtpCredentials.password,
      To: environment.smtpCredentials.to,
      From: environment.smtpCredentials.from,
      Subject: 'Solicitud de compra de paquete',
      Body: `<div>
        <p>Se ha solicitado la compra de un paquete:</p>
        <p>Usuario: ${this.storageService.getValue('user').username}</p>
        <p>Nombre del paquete: ${this.selectedPackage.name}</p>
        <p>Método de pago: ${wtp}</p>
        <p>Monto: ${value}</p>

      </div>`,
    }).then((message: any) => {
      alert(message);
      this.transactionForm.reset();
    });

    this.configService.setLoadingPage(false);
  }


}
