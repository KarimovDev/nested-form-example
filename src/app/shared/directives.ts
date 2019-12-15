import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AutoUnsubscribe } from './decorators';
import { fromEvent, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@AutoUnsubscribe()
@Directive({
  selector: '[nfInteractiveNumber]',
})
export class InteractiveNumberDirective implements OnInit {
  private keypressSubscription: Subscription;
  private forbiddenKeys = ['.', ',', 'e'];

  @Input('nfInteractiveNumber') form: FormGroup;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.keypressSubscription = fromEvent(
      this.el.nativeElement,
      'keypress'
    ).subscribe((event: KeyboardEvent) => {
      const currentValue = parseInt(this.form.controls.childCounter.value, 10);
      if (event.key === '+') {
        event.preventDefault();
        if (isNaN(currentValue)) {
          this.form.patchValue({
            childCounter: 1,
          });
        } else {
          this.form.patchValue({
            childCounter: currentValue + 1,
          });
        }
      } else if (event.key === '-') {
        event.preventDefault();
        if (isNaN(currentValue)) {
          this.form.patchValue({
            childCounter: 0,
          });
        } else {
          this.form.patchValue({
            childCounter: currentValue - 1,
          });
        }
      } else if (this.forbiddenKeys.includes(event.key)) {
        event.preventDefault();
      }
    });
  }
}
