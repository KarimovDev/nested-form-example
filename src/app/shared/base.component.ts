import { Router } from '@angular/router';

export abstract class BaseComponent {
  constructor(protected router: Router) {}

  protected redirect(url: string): void {
    this.router.navigate([url]);
  }
}
