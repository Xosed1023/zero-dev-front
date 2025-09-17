import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageDialogComponent } from './add-package-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: AddPackageDialogComponent;
  let fixture: ComponentFixture<AddPackageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
