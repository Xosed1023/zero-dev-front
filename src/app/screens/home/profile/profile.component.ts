import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/shared/models/role';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { ActiveUsersService } from '../users/active/services/active-users.service';
import { StorageService } from 'app/shared/services/storage.service';
import { User } from 'app/shared/models/user.interfaces';
import * as moment from 'moment';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('myProfileForm', { static: false }) myProfileForm:
    | NgForm
    | undefined;
  @ViewChild('myFormPassword', { static: false }) myFormPassword:
    | NgForm
    | undefined;

  public profileForm: FormGroup;
  public hideRegister = true;
  public hideRegisterConfirm = true;
  public validator =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  public mode = 'view';
  public profileSelect: number = 0;
  public profileList: Role[] = [];
  public formPassword: FormGroup;
  public user: User | undefined;
  public balances: any = [];

  constructor(
    public configService: ConfigurationService,
    private router: Router,
    private fb: FormBuilder,
    private activeUserService: ActiveUsersService,
    public storageService: StorageService,
    public homeService: HomeService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDay: [undefined, [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      stateDpto: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.formPassword = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.profileList = [
      this.configService.adminUser,
      this.configService.clientUser,
    ];
    const result = await this.activeUserService.getUser(
      this.storageService.getValue('user').username
    );


    /* const balances = await this.homeService.getBalances();
    this.balances = balances.filter((balance: any) => balance.username === this.storageService.getValue('user').username) */

    this.user = result[0];
    if (this.user) {
      this.profileForm.setValue({
        name: this.user.names ?? '',
        lastName: this.user.surname ?? '',
        username: this.user.username ?? '',
        email: this.user.email ?? 0,
        birthDay: moment(this.user.birthdate ?? '').format('YYYY-MM-DD'),
        address: this.user.direction ?? '',
        country: this.user.country ?? '',
        city: this.user.city ?? '',
        postalCode: this.user.postal_code ?? '',
        profile: this.user.id_rol
          ? this.configService.profiles.find((x) => x.key === this.user?.id_rol)
              ?.key
          : '',
        password: 'd',
        stateDpto: this.user.state_dpto,
      });
      this.profileSelect = this.profileForm?.value.profile;
    }
    this.disabledForm()
  }

  sendForm() {
    this.enabledForm()
    if (!this.profileForm?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const {
      name,
      lastName,
      username,
      email,
      birthDay,
      address,
      country,
      city,
      postalCode,
      profile,
      stateDpto,
      password,
    } = this.profileForm?.value;
    const user: User = {
      names: name,
      surname: lastName,
      username,
      email,
      password,
      birthdate: moment(birthDay).format('YYYY/MM/DD'),
      direction: address,
      country,
      city,
      postal_code: postalCode,
      id_rol: profile,
      state_dpto: stateDpto,
    };

    user.id_user = this.user?.id ?? '';
    user.id_state = 1;
    user.id_location = this.user?.id_location ?? 0;
    if (user.password === 'd') {
      delete user['password'];
    }

    return this.activeUserService
      .updateUser(user)
      .then((data) => {
        this.disabledForm();
        this.mode = 'view';
      })
      .catch(() => {
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }

  editForm() {
    this.mode = 'edit';
    this.enabledForm();
    this.disabledEditForm();
  }

  public select(item: any) {
    this.profileSelect = item.value;
  }

  enabledForm() {
    this.profileForm?.controls['name'].enable();
    this.profileForm?.controls['lastName'].enable();
    this.profileForm?.controls['username'].enable();
    this.profileForm?.controls['email'].enable();
    this.profileForm?.controls['birthDay'].enable();
    this.profileForm?.controls['address'].enable();
    this.profileForm?.controls['country'].enable();
    this.profileForm?.controls['stateDpto'].enable();
    this.profileForm?.controls['city'].enable();
    this.profileForm?.controls['postalCode'].enable();
    this.profileForm?.controls['profile'].enable();
    this.profileForm?.controls['password'].enable();
  }

  disabledForm() {
    this.profileForm?.controls['name'].disable();
    this.profileForm?.controls['lastName'].disable();
    this.profileForm?.controls['username'].disable();
    this.profileForm?.controls['email'].disable();
    this.profileForm?.controls['birthDay'].disable();
    this.profileForm?.controls['address'].disable();
    this.profileForm?.controls['country'].disable();
    this.profileForm?.controls['stateDpto'].disable();
    this.profileForm?.controls['city'].disable();
    this.profileForm?.controls['postalCode'].disable();
    this.profileForm?.controls['profile'].disable();
    this.profileForm?.controls['password'].disable();
  }

  disabledEditForm() {
    this.profileForm?.controls['username'].disable();
    this.profileForm?.controls['email'].disable();
    this.profileForm?.controls['profile'].disable();
    this.profileForm?.controls['password'].disable();
  }

  public createPassword() {
    if (!this.formPassword?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { password } = this.formPassword?.value;
    const passwordBody: any = {
      password,
    };
    return this.activeUserService
      .createPassword(passwordBody)
      .then((data) => {
        if (this.mode !== 'view') {
          this.profileForm?.controls['password'].enable();
          this.profileForm?.patchValue({
            password: data.password,
          });
          this.profileForm?.controls['password'].disable();
        }
      })
      .catch(() => {
        this.formPassword?.reset();
        this.myFormPassword?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
