import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'nf-child-counter',
  template: `
    <mat-form-field [formGroup]="form">
      <input
        matInput
        type="number"
        placeholder="Child"
        min="0"
        max="100"
        formControlName="childCounter"
        required
      />
      <mat-error *ngIf="form.controls.childCounter.hasError('required')">
        You must enter a value
      </mat-error>
      <mat-error *ngIf="form.controls.childCounter.hasError('min')">
        Нельзя указать меньше
        {{ form.controls.childCounter.getError('min').min }}
      </mat-error>
      <mat-error *ngIf="form.controls.childCounter.hasError('max')">
        Нельзя указать больше
        {{ form.controls.childCounter.getError('max').max }}
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class ChildCounterComponent extends BaseControlComponent {}
