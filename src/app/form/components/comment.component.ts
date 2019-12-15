import { Component } from '@angular/core';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'nf-comment',
  template: `
    <mat-form-field [formGroup]="form">
      <input matInput placeholder="Комментарий" formControlName="comment" />
    </mat-form-field>
  `,
  styles: ['.mat-form-field { width: 100%; margin: 5px 0; }'],
})
export class CommentComponent extends BaseControlComponent {}
