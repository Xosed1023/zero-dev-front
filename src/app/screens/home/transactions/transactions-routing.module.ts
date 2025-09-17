import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversionComponent } from './conversion/conversion.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsComponent } from './transactions.component';
import { RolAdmin, RolClient, RolConsultant } from 'app/shared/models/role';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { PackagesComponent } from './packages/packages.component';
import { RechargeComponent } from './recharge/recharge.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      {
        path: '',
        redirectTo: 'conversion',
        pathMatch: 'full',
      },
      {
        path: 'conversion',
        component: ConversionComponent,
        data: {
          roles: [new RolClient().key,],
        },
        canActivate: [RoleByIdGuard],
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        data: {
          roles: [new RolClient().key,],
        },
        canActivate: [RoleByIdGuard],
      },
      {
        path: 'transfer',
        component: TransferComponent,
        data: {
          roles: [new RolClient().key,],
        },
        canActivate: [RoleByIdGuard],
      },
      {
        path: 'packages',
        component: PackagesComponent,
        data: {
          roles: [new RolClient().key,],
        },
        canActivate: [RoleByIdGuard],
      },
      {
        path: 'recharge',
        component: RechargeComponent,
        data: {
          roles: [new RolClient().key,],
        },
        canActivate: [RoleByIdGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
