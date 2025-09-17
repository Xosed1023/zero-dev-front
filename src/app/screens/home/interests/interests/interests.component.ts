import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { InterestsService } from '../services/interests.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent {
  public formInterests: FormGroup;

  constructor(private fb: FormBuilder,
    public configService: ConfigurationService,
    public interestsService: InterestsService) {
    this.formInterests = this.fb.group({
      username: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }


  /**
   * Envio del formulario de intereses
   */
  sendForm() {
    this.enableForm()
    if (!this.formInterests?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const {
      username,
      accountNumber,
      amount
    } = this.formInterests?.value;
    const data = {
      username,
      account_number: accountNumber,
      cupo: amount
    };

    return this.interestsService
      .updateIntrest(data)
      .then((data) => {
        this.disabledForm();
      })
      .catch(e => {
        console.error({e});
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }

  /**
   * Se habilita nuevamente el formulario
   */
  enableForm() {
    this.formInterests?.controls['username'].enable();
    this.formInterests?.controls['accountNumber'].enable();
    this.formInterests?.controls['amount'].enable();
  }

  disabledForm() {
    this.formInterests?.controls['username'].disable();
    this.formInterests?.controls['accountNumber'].disable();
    this.formInterests?.controls['amount'].disable();
  }
}
