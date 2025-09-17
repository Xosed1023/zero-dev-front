import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderHomeModule } from 'app/components/header-home/header-home.module';
import { MenuComponent } from 'app/components/menu/menu.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    WelcomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HeaderHomeModule,
    MatSidenavModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideEnvironmentNgxMask(), ShowThounsandDecimalsPipe],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
