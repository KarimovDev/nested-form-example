import { Component } from '@angular/core';

@Component({
  selector: 'nf-not-found',
  template: `
    <div class="title">
      <h3>Страница не найдена</h3>
    </div>
    <div class="text">Запрашиваемой страницы не существует</div>
    <div class="text">
      <a [routerLink]="['']">Вернуться на главную страницу</a>
    </div>
  `,
})
export class NotFoundComponent {}
