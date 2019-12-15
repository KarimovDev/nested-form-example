import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';
import { MaritalStatus, GENDER } from '@nf-shared/models';

@Component({
  selector: 'nf-status',
  template: `
    <mat-form-field [formGroup]="form">
      <mat-label>Семейное положение</mat-label>
      <mat-select formControlName="status" required>
        <mat-option *ngFor="let status of maritalStatus" [value]="status.value">
          {{ status.value }}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="form.controls.status.hasError('required')">
        You must pick a value
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class StatusComponent extends BaseControlComponent {
  maritalStatus: MaritalStatus[] = [
    {
      value: 'женат',
      gender: GENDER.M,
    },
    { value: 'замужем', gender: GENDER.W },
    { value: 'в разводе', gender: null },
    { value: 'нет', gender: null },
  ];
}
