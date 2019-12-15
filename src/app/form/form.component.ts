import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RussianLettersMaskPipe, OnlyDigitsMaskPipe } from '@nf-shared/pipes';
import { AutoUnsubscribe } from '@nf-shared/decorators';
import { Subscription, timer, Observable, BehaviorSubject } from 'rxjs';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { HttpService } from 'app/services/http.service';
import { calculateAge, maskCallback } from '@nf-shared/helpers';
import { MaritalStatus, GENDER } from '@nf-shared/models';
import { NestedFormValidators } from '@nf-shared/validators';

@AutoUnsubscribe()
@Component({
  selector: 'nf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  private isDisabledSubmitButton: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  private formSubscription: Subscription;
  private nameSubscription: Subscription;
  private commentSubscription: Subscription;
  private childCounterSubscription: Subscription;
  private dateSubscription: Subscription;
  private genderSubscription: Subscription;
  private httpSubscription: Subscription;
  private delayButtonSubscription: Subscription;
  private wrongSubmitCounter = 0;
  private readonly maritalStatus: MaritalStatus[] = [
    {
      value: 'женат',
      gender: GENDER.M,
    },
    { value: 'замужем', gender: GENDER.W },
    { value: 'в разводе', gender: null },
    { value: 'нет', gender: null },
  ];
  private bindedMaskCallback = maskCallback.bind(this);

  public form: FormGroup;
  public isDisabledSubmitButton$: Observable<
    boolean
  > = this.isDisabledSubmitButton.asObservable();
  public showStatusControl = false;
  public filteredMaritalStatus = [...this.maritalStatus];

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
        NestedFormValidators.isNameFieldCorrect,
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
      this.bindedMaskCallback('name', 'russianLettersMask')
    );

    this.commentSubscription = this.form.controls.comment.valueChanges.subscribe(
      this.bindedMaskCallback('comment', 'russianLettersMask')
    );

    this.childCounterSubscription = this.form.controls.childCounter.valueChanges.subscribe(
      this.bindedMaskCallback('childCounter', 'onlyDigitsMask')
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

    this.genderSubscription = this.form.controls.gender.valueChanges.subscribe(
      gender => {
        this.filteredMaritalStatus = this.maritalStatus.filter(
          el => el.gender === gender || !el.gender
        );
      }
    );
  }

  startDelayUndisabling(ms: number) {
    this.isDisabledSubmitButton.next(true);
    this.delayButtonSubscription = timer(ms).subscribe(result =>
      this.isDisabledSubmitButton.next(false)
    );
  }

  submit() {
    this.startDelayUndisabling(10000);

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
