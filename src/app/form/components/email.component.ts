import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'nf-email',
  template: `
    <mat-form-field [formGroup]="form">
      <input matInput placeholder="Email" formControlName="email" required />
      <mat-error *ngIf="form.controls.email.hasError('required')">
        You must enter a value
      </mat-error>
      <mat-error *ngIf="form.controls.email.hasError('email')">
        Email is incorrect
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class EmailComponent extends BaseControlComponent {}
