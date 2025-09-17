import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { LandingService } from './landing.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialogs } from 'app/shared/models/dialog.class';
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('myLandingForm', { static: false }) myLandingForm:
    | NgForm
    | undefined;

  public landingForm: FormGroup;
  public items = [
    {
      title: 'PAQUETE BASIC',
      selected: false,
      color:
        'https://static.vecteezy.com/system/resources/previews/012/348/115/non_2x/blue-gradient-color-background-for-metallic-graphic-design-vector.jpg',
      info: 'Un pricing sencillo y flexible adaptado a sus necesidades financieras',
      profit: '10.000',
      profit2: '50.000',
      value: 3,
    },
    {
      title: 'PAQUETE ORO',
      selected: false,
      color:
        'https://img.freepik.com/fotos-premium/fondo-dorado-brillante_120819-157.jpg',
      info: 'Un pricing sencillo y flexible adaptado a sus necesidades financieras',
      profit: '51.000',
      profit2: '350.000',
      value: 5,
    },
    {
      title: 'PAQUETE PLATINO',
      selected: false,
      color:
        'https://st4.depositphotos.com/15076736/21725/i/450/depositphotos_217255604-stock-photo-abstract-pastel-soft-colorful-smooth.jpg',
      info: 'Un pricing sencillo y flexible adaptado a sus necesidades financieras',
      profit: '351.000',
      profit2: '1.000.000',
      value: 7,
    },
  ];
  public viewForm = false;
  public selectedPackage: any = {};
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

  public showImage = false;

  constructor(
    private fb: FormBuilder,
    public landingService: LandingService,
    public configService: ConfigurationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.landingForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        birthDay: [undefined, [Validators.required]],
        address: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        region: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        wtp: ['', [Validators.required]],
        phone: ['', [Validators.required]]
      },
      {}
    );
  }

  ngOnInit(): void { }

  async sendForm() {
    const { email } = this.landingForm?.value;

    const restoreSerialized = {
      email: email,
    };

    if (!this.landingForm?.valid) {
      this.getErrorMessages();
      this.configService.validationError();
      return;
    }

    // Se obtienen todos los datos del form para enviarlos por mail junto con el paquete
    const { title, info, profit, profit2, value } = this.selectedPackage;
    const emailData = {
      ...this.landingForm?.value,
      birthDay: moment(this.landingForm.value['birthDay']).format('YYYY-MM-DD'),
      title, info, profit, profit2, value
    };
    // Envío de mail
    await this.landingService.sendEmailForm(emailData);
    return this.router.navigate([`login`]);
  }


  /**
 * Retrieves error messages for the landing form controls.
 * Can be used for debug form controls.
 *
 * @return {string[]} An array of error messages.
 */
  getErrorMessages(): string[] {
    const mensajes: string[] = [];

    Object.keys(this.landingForm.controls).forEach(controlName => {
      const control = this.landingForm.get(controlName);

      if (control?.errors) {
        Object.keys(control?.errors).forEach(error => {
          // Puedes personalizar el mensaje según tus necesidades
          let mensaje = `${controlName}: `;

          switch (error) {
            case 'required':
              mensaje += 'Campo requerido';
              break;
            case 'email':
              mensaje += 'Formato de correo electrónico inválido';
              break;
            // Agrega más casos según tus validaciones
          }

          mensajes.push(mensaje);
        });
      }
    });
    return mensajes;
  }


  changeViewForm(item: any) {
    this.items.forEach((element) => {
      element.selected = false;
      if (element.title === item.title) {
        element.selected = true;
        // Se carga el paquete para atarlo al formulario
        this.selectedPackage = element;
      }
    });
    this.viewForm = true;
    setTimeout(() => {
      const miContenedor = document.getElementById('containerPages');
      if (miContenedor) {
        miContenedor.scrollTop += window.innerHeight;
      }
    }, 100);
  }

  goLogin() {
    this.router.navigate([`login`]);
  }

  public disableBasicCost(item: any) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: new Dialogs('info', item.title,
        '', '', '', item.profit, item.profit2, item.value), width: '450px'
    });
  }
}
