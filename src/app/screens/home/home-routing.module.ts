import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RolAdmin, RolClient, RolConsultant } from 'app/shared/models/role';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'profile', loadChildren:
          () => import('./profile/profile.module').then(m => m.ProfileModule), data: {
            roles: [new RolClient().key, new RolAdmin().key, new RolConsultant().key],
          },
          canActivate: [RoleByIdGuard],
      },
      {
        path: 'account/:id', loadChildren:
          () => import('./account/account.module').then(m => m.AccountModule), data: {
            roles: [new RolClient().key, new RolAdmin().key, new RolConsultant().key],
          },
          canActivate: [RoleByIdGuard],
      },
      {
        path: 'transactions', loadChildren:
          () => import('./transactions/transactions.module').then(m => m.TransactionsModule),  data: {
            roles: [new RolClient().key],
          },
          canActivate: [RoleByIdGuard],
      },
      {
        path: 'users', loadChildren:
          () => import('./users/users.module').then(m => m.UserModule),  data: {
            roles: [new RolAdmin().key, new RolConsultant().key],
          },
          canActivate: [RoleByIdGuard],
      },
      {
        path: 'works', loadChildren:
          () => import('./users/users.module').then(m => m.UserModule), 
          data: {
            roles: [new RolAdmin().key, new RolConsultant().key],
          },
          canActivate: [RoleByIdGuard]
      },
      {
        path: 'interests', loadChildren:
        () => import('./interests/interests.module').then(m => m.InterestsModule),
          data: {
            roles: [new RolAdmin().key],
          },
          canActivate: [RoleByIdGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
