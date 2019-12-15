import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'nf-name',
  template: `
    <mat-form-field [formGroup]="form">
      <input matInput placeholder="ФИО" formControlName="name" required />
      <mat-error *ngIf="form.controls.name.hasError('required')">
        {{ errors.REQUIRED }}
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class NameComponent extends BaseControlComponent {}
