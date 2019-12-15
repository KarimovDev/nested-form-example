import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';
import { GENDER } from '@nf-shared/models';

@Component({
  selector: 'nf-gender',
  template: `
    <ng-container [formGroup]="form" required>
      <label id="radio-group-label">Пол *</label>
      <mat-radio-group
        aria-labelledby="radio-group-label"
        class="radio-group"
        formControlName="gender"
      >
        <mat-radio-button
          class="radio-button"
          *ngFor="let gender of genders"
          [value]="gender"
        >
          {{ gender }}
        </mat-radio-button>
      </mat-radio-group>
      <mat-error
        *ngIf="
          form.controls.gender.hasError('required') &&
          form.controls.gender.touched
        "
      >
        {{ errors.REQUIRED }}
      </mat-error>
    </ng-container>
  `,
  styles: [
    '.radio-group { display: flex; flex-direction: column; margin: 5px 0 }',
    '.radio-button { margin: 5px 0 }',
  ],
})
export class GenderComponent extends BaseControlComponent {
  public genders: GENDER[] = [GENDER.M, GENDER.W];
}
