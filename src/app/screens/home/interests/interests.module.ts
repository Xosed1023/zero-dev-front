import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterestsRoutingModule } from './interests-routing.module';
import { InterestsComponent } from './interests/interests.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@NgModule({
  declarations: [
    InterestsComponent
  ],
  imports: [
    CommonModule,
    InterestsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  bootstrap: [InterestsComponent]
})
export class InterestsModule { }
