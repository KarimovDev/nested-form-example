import { Component, Input } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

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
  @Input()
  maritalStatus;
}
