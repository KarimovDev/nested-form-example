import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';
import emailMask from 'text-mask-addons/dist/emailMask';

@Component({
  selector: 'nf-email',
  template: `
    <mat-form-field [formGroup]="form">
      <input
        matInput
        placeholder="Email"
        formControlName="email"
        [textMask]="{ mask: mask }"
        required
      />
      <mat-error *ngIf="form.controls.email.hasError('required')">
        {{ errors.REQUIRED }}
      </mat-error>
      <mat-error *ngIf="form.controls.email.hasError('email')">
        Email неправильный
      </mat-error>
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class EmailComponent extends BaseControlComponent {
  mask = emailMask;
}
