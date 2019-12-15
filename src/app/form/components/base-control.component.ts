import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ERRORS } from '@nf-shared/errors-descriptions';

export abstract class BaseControlComponent {
  @Input()
  public form: FormGroup;

  public readonly errors = ERRORS;
}
