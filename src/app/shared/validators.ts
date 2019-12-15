import { FormControl } from '@angular/forms';

export class NestedFormValidators {
  static isNameFieldCorrect(control: FormControl): { [key: string]: boolean } {
    if (control.value) {
      const numberOfNonEmptyStrings = (control.value as string)
        .split(' ')
        .reduce(
          (acc: number, currValue) => acc + (currValue.length > 0 ? 1 : 0),
          0
        );

      if (numberOfNonEmptyStrings < 2) {
        return { nameIncorrect: true };
      }
    }

    return null;
  }
}
