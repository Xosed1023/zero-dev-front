import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ActiveUsersService } from './active-users.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FormsActiveUsersService {
  public formUser: FormGroup | undefined;
  public formPassword: FormGroup | undefined;
  public user: User | undefined;
  public idUser: string = '';
  public validator =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  public profileSelect: number = 0;
  public password = '';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private activeUserService: ActiveUsersService
  ) {}

  public async createForm(mode: modeViewCrud) {
    this.formUser = this.fb.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        birthDay: [undefined, [Validators.required]],
        address: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        stateDpto: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        profile: ['', [Validators.required]],
        password: ['', [Validators.required]],
        eth: ['', [Validators.required]],
        usdt: ['', [Validators.required]],
        btc: ['', [Validators.required]],
      },
      {}
    );
    this.formPassword = this.fb.group({
      password: ['', [Validators.required]],
    });
    this.formUser.controls['password'].disable();
    if (mode != 'create') {
      const result = await this.activeUserService.getUser(this.idUser);
      this.user = result[0];
      if (this.user) {
        this.formUser.setValue({
          name: this.user.names ?? '',
          lastName: this.user.surname ?? '',
          email: this.user.email ?? 0,
          birthDay: moment(this.user.birthdate ?? '').format('YYYY-MM-DD'),
          address: this.user.direction ?? '',
          country: this.user.country ?? '',
          city: this.user.city ?? '',
          postalCode: this.user.postal_code ?? '',
          profile: this.user.id_rol
            ? this.configService.profiles.find(
                (x) => x.key === this.user?.id_rol
              )?.key
            : '',
          password: 'd',
          stateDpto: this.user.state_dpto,
          usdt: 'a',
          eth: 'a',
          btc: 'a'
        });
        this.profileSelect = this.formUser?.value.profile;
      }
    }

    if (mode === 'view') {
      this.disabledForm();
    }

    if (mode === 'edit') {
      this.disabledEditForm();
    }

    this.configService.setLoadingPage(false);
  }

  enabledForm() {
    this.formUser?.controls['name'].enable();
    this.formUser?.controls['lastName'].enable();
    this.formUser?.controls['email'].enable();
    this.formUser?.controls['birthDay'].enable();
    this.formUser?.controls['address'].enable();
    this.formUser?.controls['country'].enable();
    this.formUser?.controls['stateDpto'].enable();
    this.formUser?.controls['city'].enable();
    this.formUser?.controls['postalCode'].enable();
    this.formUser?.controls['profile'].enable();
    this.formUser?.controls['password'].enable();
    this.formUser?.controls['usdt'].enable();
    this.formUser?.controls['eth'].enable();
    this.formUser?.controls['btc'].enable();
  }

  disabledForm() {
    this.formUser?.controls['name'].disable();
    this.formUser?.controls['lastName'].disable();
    this.formUser?.controls['email'].disable();
    this.formUser?.controls['birthDay'].disable();
    this.formUser?.controls['address'].disable();
    this.formUser?.controls['country'].disable();
    this.formUser?.controls['stateDpto'].disable();
    this.formUser?.controls['city'].disable();
    this.formUser?.controls['postalCode'].disable();
    this.formUser?.controls['profile'].disable();
    this.formUser?.controls['password'].disable();
    this.formUser?.controls['usdt'].disable();
    this.formUser?.controls['eth'].disable();
    this.formUser?.controls['btc'].disable();
  }

  disabledEditForm() {
    this.formUser?.controls['email'].disable();
    this.formUser?.controls['profile'].disable();
    this.formUser?.controls['password'].disable();
    this.formUser?.controls['usdt'].disable();
    this.formUser?.controls['eth'].disable();
    this.formUser?.controls['btc'].disable();
  }
}
