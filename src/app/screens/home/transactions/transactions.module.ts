import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { ConversionComponent } from './conversion/conversion.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableModule } from '../../../components/table/table.module';
import { MatSelectModule } from '@angular/material/select';
import { PackagesComponent } from './packages/packages.component';
import { RechargeComponent } from './recharge/recharge.component';
import { ShowThounsandDecimalsPipe } from 'app/shared/pipes/show-thounsand-decimals.pipe';

@NgModule({
  declarations: [
    TransactionsComponent,
    ConversionComponent,
    WithdrawalComponent,
    TransferComponent,
    PackagesComponent,
    RechargeComponent
  ],
  imports: [
    TransactionsRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableModule,
    MatSelectModule,
  ],
  providers: [ShowThounsandDecimalsPipe],
  bootstrap: [TransactionsComponent]
})
export class TransactionsModule { }
