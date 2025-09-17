import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountTypeBtc, AccountTypeEth, AccountTypeUsdt } from 'app/shared/models/account-type';
import { Dialogs } from 'app/shared/models/dialog.class';
import { PackageBasic, PackageGold, PackagePlatinum } from 'app/shared/models/packages';

@Component({
  selector: 'app-add-package-dialog',
  templateUrl: './add-package-dialog.component.html',
  styleUrls: ['./add-package-dialog.component.scss']
})
export class AddPackageDialogComponent {
  public listPackages = [new PackageBasic(), new PackageGold(), new PackagePlatinum()]
  public listAccounts = [new AccountTypeUsdt(), new AccountTypeEth(), new AccountTypeBtc()]
  public packageSelect: any;
  public accountSelect: any;
  public packageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPackageDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.packageForm = this.fb.group({
      package: ['', [Validators.required]],
      account: ['', [Validators.required]],
      value: ['', [Validators.required]],
      voucher: [{ value: this.generateVoucherId(), disabled: true }, [Validators.required]],
      //voucher: [''],
      //voucher: [{ value: '', disabled: true }],
    });

  }

  public select(item: any) {
    this.packageSelect = item;
  }

  public selectAccount(item: any) {
    this.accountSelect = item;
  }

  onEnviarClick(): void {
    if (this.packageForm.valid) {
      // Envía el formulario al componente padre
      this.dialogRef.close({ ...this.packageForm.value, voucher: this.packageForm.get('voucher')?.value });
    } else {
      this.snackBar.open('Revisa que todos los campos este bien', 'x', {
        duration: 2000,
        panelClass: ['snackbar-alert'],
      });
    }
  }

  public close() {
  }

  public generateVoucherId() {
    const timestamp = Date.now();
    return timestamp + "";
  }

}

