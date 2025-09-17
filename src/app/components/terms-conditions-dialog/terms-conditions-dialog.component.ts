import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialogs } from 'app/shared/models/dialog.class';
@Component({
  selector: 'app-terms-conditions-dialog',
  templateUrl: './terms-conditions-dialog.component.html',
  styleUrls: ['./terms-conditions-dialog.component.scss']
})
export class TermsConditionsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TermsConditionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  onNoClick(): void {
  }

  public close() {
  }
  
}

