import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderHomeModule } from 'app/components/header-home/header-home.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    HeaderHomeModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
        },
        display: {
          dateInput: 'DD-MMM-YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'L',
          monthYearA11yLabel: 'MMMM YYYY'
        },
      },
    },
    { provide: LOCALE_ID, useValue: 'es' },
    ShowThounsandDecimalsPipe
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule {}
