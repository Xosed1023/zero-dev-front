import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsActiveUsersService } from './services/forms-active-users.service';
import { TableActiveUsersService } from './services/table-active-users.service';
import { ActiveUsersService } from './services/active-users.service';
import { User } from 'app/shared/models/user.interfaces';
import { Role } from 'app/shared/models/role';
import * as moment from 'moment';
import { StorageService } from 'app/shared/services/storage.service';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit, AfterViewInit {
  @ViewChild('myFormUser', { static: false }) myFormUser: NgForm | undefined;
  @ViewChild('myFormPassword', { static: false }) myFormPassword: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public disabled = false;
  public title = 'Agregar Usuario';
  public hidePassword = true;
  public id = parseInt(this.storageService.getValue('user').id)
  public balances: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableActiveUserService: TableActiveUsersService,
    public formsActiveUserService: FormsActiveUsersService,
    public configService: ConfigurationService,
    private activeUserService: ActiveUsersService,
    public storageService: StorageService,
    public homeService: HomeService
  ) {
    this.formsActiveUserService.idUser =
      this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngAfterViewInit(): void {}

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [
      this.configService.adminUser,
      this.configService.clientUser,
      this.configService.consultantUser
    ];
    this.mode = this.route.snapshot.data['mode'];

    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async getBalances(){
    this.homeService.getBalances().then(data => {
      this.balances = data.filter((balance: any) => balance.username === this.storageService.getValue('user').username);    
    });
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode === 'table') {
      await this.tableActiveUserService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'view':
          this.title = 'Usuario';
          this.disabled = true;
          break;

        case 'edit':
          this.title = 'Editar Usuario';
          break;

        case 'create':
          this.title = 'Agregar Usuario';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsActiveUserService.createForm(this.mode);
      //await this.getBalances();
    }
  }

  public addUserButton() {
    this.formsActiveUserService.profileSelect = 0;
    this.formsActiveUserService.idUser = '';
    this.router.navigate(['home/users/active/create']);
  }

  public back() {
    this.router.navigate(['home/users/']);
    this.formsActiveUserService.profileSelect = 0;
  }

  public select(item: any) {
    this.formsActiveUserService.profileSelect = item.value;
  }

  public saveUser() {
    this.formsActiveUserService.enabledForm()
    if (!this.formsActiveUserService.formUser?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const {
      name,
      lastName,
      email,
      birthDay,
      address,
      country,
      city,
      postalCode,
      profile,
      stateDpto,
      password,
      usdt,
      eth,
      btc
    } = this.formsActiveUserService.formUser?.value;
    const user: User  = {
      names: name,
      surname: lastName,
      username: email,
      email,
      password,
      birthdate: moment(birthDay).format('YYYY/MM/DD'),
      direction: address,
      country,
      city,
      postal_code: postalCode,
      id_rol: profile,
      state_dpto: stateDpto,
      wallet_usdt: usdt,
      wallet_eth: eth,
      wallet_btc: btc
    };
    this.formsActiveUserService.formUser?.controls['password'].disable();
    if(this.mode === 'edit') {
      user.id_user = this.formsActiveUserService.user?.id?? '';
      user.id_state =1;
      user.id_location = this.formsActiveUserService.user?.id_location?? 0;
      if(user.password==='d'){
        delete user['password']
      }
      delete user['wallet_usdt']
      delete user['wallet_eth']
      delete user['wallet_btc']
    }
    const promise =
      this.mode === 'edit'
        ? this.activeUserService.updateUser(user)
        : this.activeUserService.createUser(user);

    return promise
      .then((data) => {
        if (this.mode === 'edit') {
          this.formsActiveUserService.disabledEditForm();
        } else {
          this.router.navigate(['home/users/']);
        }
      })
      .catch(() => {
        this.formsActiveUserService.formUser?.reset();
        this.myFormUser?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }

  public createPassword() {
    if (!this.formsActiveUserService.formPassword?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const {
      password,
    } = this.formsActiveUserService.formPassword?.value;
    const passwordBody: any = {
      password
    };
    return this.activeUserService.createPassword(passwordBody)
      .then((data) => {
        if (this.mode !== 'view') {
          this.formsActiveUserService.formUser?.controls['password'].enable();
          this.formsActiveUserService.formUser?.patchValue({
            password: data.password,
          });
          this.formsActiveUserService.formUser?.controls['password'].disable();
        } 
      })
      .catch(() => {
        this.formsActiveUserService.formPassword?.reset();
        this.myFormPassword?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
