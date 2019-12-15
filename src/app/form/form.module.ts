import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '@nf-shared/ui-kit.module';
import { EmailComponent } from './components/email.component';
import { NameComponent } from './components/name.component';
import { GenderComponent } from './components/gender.component';
import { TextMaskModule } from 'angular2-text-mask';
import { RussianLettersMaskPipe, OnlyDigitsMaskPipe } from '@nf-shared/pipes';
import { DateComponent } from './components/date.component';
import { StatusComponent } from './components/status.component';
import { ChildCounterComponent } from './components/child-counter.component';
import { CommentComponent } from './components/comment.component';
import { InteractiveNumberDirective } from '@nf-shared/directives';

@NgModule({
  declarations: [
    FormComponent,
    EmailComponent,
    NameComponent,
    GenderComponent,
    DateComponent,
    StatusComponent,
    ChildCounterComponent,
    CommentComponent,
    RussianLettersMaskPipe,
    OnlyDigitsMaskPipe,
    InteractiveNumberDirective,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    UiKitModule,
    TextMaskModule,
  ],
  providers: [RussianLettersMaskPipe, OnlyDigitsMaskPipe],
})
export class FormModule {}
