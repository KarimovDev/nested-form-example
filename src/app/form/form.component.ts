import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RussianLettersMaskPipe, OnlyDigitsMaskPipe } from '@nf-shared/pipes';
import { AutoUnsubscribe } from '@nf-shared/decorators';
import { Subscription, timer } from 'rxjs';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { HttpService } from 'app/services/http.service';
import { calculateAge, maskCallback } from '@nf-shared/helpers';

@AutoUnsubscribe()
@Component({
  selector: 'nf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public isDisabledSubmit = false;
  public showStatusControl = false;
  private formSubscription: Subscription;
  private nameSubscription: Subscription;
  private commentSubscription: Subscription;
  private childCounterSubscription: Subscription;
  private dateSubscription: Subscription;
  private httpSubscription: Subscription;
  private delayButtonSubscription: Subscription;
  private wrongSubmitCounter = 0;

  constructor(
    private russianLettersMask: RussianLettersMaskPipe,
    private onlyDigitsMask: OnlyDigitsMaskPipe,
    private storeService: StoreService,
    private router: Router,
    private http: HttpService
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
      maskCallback('name', 'russianLettersMask')
    );

    this.commentSubscription = this.form.controls.comment.valueChanges.subscribe(
      maskCallback('comment', 'russianLettersMask')
    );

    this.childCounterSubscription = this.form.controls.childCounter.valueChanges.subscribe(
      maskCallback('childCounter', 'onlyDigitsMask')
    );

    this.dateSubscription = this.form.controls.date.valueChanges.subscribe(
      date => {
        const age = calculateAge(date);

        if (age >= 18) {
          this.form.controls.status.setValidators(Validators.required);
          this.showStatusControl = true;
        } else {
          this.form.controls.status.clearValidators();
          this.form.patchValue({ status: '' });
          this.showStatusControl = false;
        }
      }
    );
  }

  startDelayUndisabling() {
    this.isDisabledSubmit = true;
    this.delayButtonSubscription = timer(1000).subscribe(
      result => (this.isDisabledSubmit = false)
    );
  }

  submit() {
    this.startDelayUndisabling();

    this.form.markAllAsTouched();

    this.wrongSubmitCounter++;
    if (this.wrongSubmitCounter >= 3) {
      this.wrongSubmitCounter = 0;
      this.form.reset();
    }

    if (this.form.valid && !this.form.pending) {
      this.wrongSubmitCounter = 0;
      const data = { ...this.form.value };

      this.httpSubscription = this.http.postForm(data).subscribe(
        res => {
          this.storeService.store$.dispatch({ type: 'ADD', data });
          this.form.reset();
          this.router.navigate(['display']);
        },
        error => console.log(error)
      );
    }
  }
}
