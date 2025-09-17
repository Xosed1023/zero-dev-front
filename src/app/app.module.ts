import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPackageDialogComponent } from './components/add-package-dialog/add-package-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TermsConditionsDialogComponent } from './components/terms-conditions-dialog/terms-conditions-dialog.component';
import { ShowThounsandDecimalsPipe } from './shared/pipes/show-thounsand-decimals.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    TermsConditionsDialogComponent,
    AddPackageDialogComponent,
    ShowThounsandDecimalsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.7)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
    NgxMaskDirective, NgxMaskPipe
  ],
  entryComponents: [ConfirmationDialogComponent, TermsConditionsDialogComponent, AddPackageDialogComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
