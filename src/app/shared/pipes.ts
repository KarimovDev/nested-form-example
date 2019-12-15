import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'russianLettersMask',
})
export class RussianLettersMaskPipe implements PipeTransform {
  value: string;

  transform(value: string, args?: any): string {
    return value !== null ? value.replace(/[^а-яА-ЯёË\s]+/g, '') : value;
  }
}

@Pipe({
  name: 'onlyDigitsMask',
})
export class OnlyDigitsMaskPipe implements PipeTransform {
  value: number;

  transform(value: number, args?: any): number {
    const newValue =
      value !== null ? Number(value.toString().replace(/[^0-9]+/g, '')) : 0;

    if (newValue > 100) {
      return 100;
    } else if (newValue < 0) {
      return 0;
    } else {
      return newValue;
    }
  }
}
