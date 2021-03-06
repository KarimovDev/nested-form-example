import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'nf-date',
  template: `
    <mat-form-field [formGroup]="form">
      <input
        matInput
        [matDatepicker]="picker"
        placeholder="Дата рождения"
        formControlName="date"
        required
      />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="form.controls.date.hasError('required')">
        {{ errors.REQUIRED }}
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class DateComponent extends BaseControlComponent {}
