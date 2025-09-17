import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs, DialogsTerms } from 'app/shared/models/dialog.class';
import { User, UserList } from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { ActiveUsersService } from './active-users.service';
import { HomeService } from 'app/screens/home/home.service';
import { StorageService } from 'app/shared/services/storage.service';
import { AddPackageDialogComponent } from 'app/components/add-package-dialog/add-package-dialog.component';
import {
  PackageBasic,
  PackageGold,
  PackagePlatinum,
} from 'app/shared/models/packages';

@Injectable({
  providedIn: 'root',
})
export class TableActiveUsersService {
  headers: string[] = [];
  data: UserList[] = [];
  actions = {
    edit: true,
    view: true,
    status: true,
    add: true,
    viewAccount: true,
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  public listPackages = [
    new PackageBasic(),
    new PackageGold(),
    new PackagePlatinum(),
  ];

  constructor(
    public activeUserService: ActiveUsersService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
    public storageService: StorageService,
    private homeService: HomeService
  ) { }

  public async assignInitialValues() {
    this.headers = [
      'Nombre',
      'Primer apellido',
      'Username',
      'Perfil',
      'Correo',
      'ETH',
      'BTC',
      'USDT',
      'USD',
    ];
    const result = await this.activeUserService.getUsers();
    const balancesData = await this.homeService.getBalances();

    this.data = result.map((item) => {
      return {
        id: item.id ?? '',
        names: item.names ?? '',
        surname: item.surname ?? '',
        username: item.username ?? '',
        id_rol: item.id_rol ?? '',
        email: item.email ?? '',
        status: item.id_state === 1 ? true : false,
        eth:balancesData.filter(
          (data: any) =>
            data.account_type === 'ETH' && data.username === item.username
        )[0]?.balance ?? 0,
        btc: balancesData.filter(
          (data: any) =>
            data.account_type === 'BTC' && data.username === item.username
        )[0]?.balance ?? 0,
        usdt: balancesData.filter(
          (data: any) =>
            data.account_type === 'USDT' && data.username === item.username
        )[0]?.balance ?? 0,
        usd: balancesData.filter(
          (data: any) =>
            data.account_type === 'USD' && data.username === item.username
        )[0]?.balance ?? 0
        /* eth: this.maskPipe.transform(
          balancesData.filter(
            (data: any) =>
              data.account_type === 'ETH' && data.username === item.username
          )[0]?.balance ?? 0, 'separator.2'
        ),
        btc: this.maskPipe.transform(balancesData.filter(
          (data: any) =>
            data.account_type === 'BTC' && data.username === item.username
        )[0]?.balance ?? 0, 'separator.2')
        ,
        usdt: this.maskPipe.transform(balancesData.filter(
          (data: any) =>
            data.account_type === 'USDT' && data.username === item.username
        )[0]?.balance ?? 0, 'separator.2'), */
      };
    });
  }

  public changeStatusUser(item: any) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: new Dialogs(
        'confirm',
        '¿Estás seguro de cambiar el estado del usuario?',
        'Este es un proceso reversible',
        'Cancelar',
        'Confirmar'
      ),
      width: '350px',
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        if (result.action == 'accept') {
          this.configService.setLoadingPage(true);
          const result = await this.activeUserService.getUser(
            this.storageService.getValue('user').username
          );
          const newUser = {
            ...result[0],
            id_state: result[0].id_state === 1 ? 3 : 1,
            id_user: item.id
          }
          delete newUser['creation_date']
          await this.activeUserService.updateUser(newUser)
          // location.reload();
          this.configService.setLoadingPage(false);
        }
      }
    });
  }

  public editUser(item: any) {
    this.router.navigate(['/home/users/active/edit', item.username]);
  }

  public viewUser(item: any) {
    this.router.navigate(['/home/users/active/view', item.username]);
  }

  public viewAccount(item: any) {
    this.storageService.setValue('account', item);
    this.router.navigate([`/home/account`, item.id]);
  }
  public addPackage(item: any) {
    const dialog = this.dialog.open(AddPackageDialogComponent, {
      data: new DialogsTerms(item),
      width: '400px',
    });
    dialog.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        this.configService.setLoadingPage(true);
        const packageObject = {
          package_name: result.package,
          value: result.value,
          profitability:
            this.listPackages.find((x) => x.name == result.package)
              ?.percentage + '%',
          package_type: result.account,
          voucher: result.voucher,
          id_user: item.id,
          username: item.username,
        };
        await this.activeUserService.addPackage(packageObject);
        this.configService.setLoadingPage(false);
      }
    });
  }

  public async backPage() { }

  public async nextPage() { }
}
