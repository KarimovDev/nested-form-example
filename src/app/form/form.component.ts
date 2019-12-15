import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RussianLettersMaskPipe, OnlyDigitsMaskPipe } from '@nf-shared/pipes';
import { AutoUnsubscribe } from '@nf-shared/decorators';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'nf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  formSubscription: Subscription;
  nameSubscription: Subscription;
  commentSubscription: Subscription;
  childCounterSubscription: Subscription;

  constructor(
    private russianLettersMask: RussianLettersMaskPipe,
    private onlyDigitsMask: OnlyDigitsMaskPipe
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        // Validators.pattern('[А-Яа-я]*?s[А-Яа-я]*'),
      ]),
      gender: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      childCounter: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      comment: new FormControl(''),
    });

    this.nameSubscription = this.form.controls.name.valueChanges.subscribe(
      value => {
        const maskedValue = this.russianLettersMask.transform(value);
        if (value !== maskedValue) {
          this.form.patchValue({ name: maskedValue });
        }
      }
    );

    this.commentSubscription = this.form.controls.comment.valueChanges.subscribe(
      value => {
        const maskedValue = this.russianLettersMask.transform(value);
        if (value !== maskedValue) {
          this.form.patchValue({ comment: maskedValue });
        }
      }
    );

    this.childCounterSubscription = this.form.controls.childCounter.valueChanges.subscribe(
      value => {
        const maskedValue = this.onlyDigitsMask.transform(value);
        if (value !== maskedValue) {
          this.form.patchValue({ childCounter: maskedValue });
        }
      }
    );
  }

  // private maskCallback(fieldName: string, maskName: string) {
  //   return value => {
  //     const maskedValue = this[maskName].transform(value);
  //       if (value !== maskedValue) {
  //         this.form.patchValue({ fieldName: maskedValue });
  //       }
  //   }
  // }

  submit() {
    this.form.markAllAsTouched();
    // Object.keys(this.form.controls).forEach(field => {
    //   const control = this.form.get(field);
    //   console.log(control);
    //   control.markAsTouched({ onlySelf: true });
    // });
    if (this.form.valid && !this.form.pending) {
      const formData = { ...this.form.value };
      console.log('Form Data:', formData);

      this.form.reset();
    }
  }
}
