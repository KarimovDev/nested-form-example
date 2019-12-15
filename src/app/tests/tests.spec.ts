import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '@nf-shared/ui-kit.module';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'app/form/form.component';
import { EmailComponent } from 'app/form/components/email.component';
import { NameComponent } from 'app/form/components/name.component';
import { GenderComponent } from 'app/form/components/gender.component';
import { DateComponent } from 'app/form/components/date.component';
import { StatusComponent } from 'app/form/components/status.component';
import { ChildCounterComponent } from 'app/form/components/child-counter.component';
import { CommentComponent } from 'app/form/components/comment.component';
import { FormRoutingModule } from 'app/form/form-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { RussianLettersMaskPipe, OnlyDigitsMaskPipe } from '@nf-shared/pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        EmailComponent,
        NameComponent,
        GenderComponent,
        DateComponent,
        StatusComponent,
        ChildCounterComponent,
        CommentComponent,
      ],
      imports: [
        CommonModule,
        FormRoutingModule,
        ReactiveFormsModule,
        UiKitModule,
        TextMaskModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [RussianLettersMaskPipe, OnlyDigitsMaskPipe],
    });

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    // fixture.nativeElement

    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should hide status component when underage', () => {
    component.ngOnInit();
    component.form.patchValue({ date: new Date(2011, 0, 1, 0, 0, 0, 0) });
    const nfStatusElement = debug.query(By.css('nf-status'));

    expect(nfStatusElement).toBeNull();
  });

  it('should show status component when underage', () => {
    component.form.patchValue({ date: new Date(1900, 0, 1, 0, 0, 0, 0) });
    const nfStatusElement = debug.query(By.css('nf-status'));

    expect(nfStatusElement).toBeDefined();
  });

  it('should refresh status value when underage was changed', () => {
    component.form.patchValue({ date: new Date(1900, 0, 1, 0, 0, 0, 0) });
    component.form.patchValue({ status: 'замужем' });
    component.form.patchValue({ date: new Date(2011, 0, 1, 0, 0, 0, 0) });
    const value = component.form.controls.status.value;

    expect(value).toBe('');
  });
});
