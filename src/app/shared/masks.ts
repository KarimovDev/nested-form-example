import { InputMask } from '@nf-shared/models';

export const RUSSIAN_LETTERS_MASK: InputMask = (rawValue: string) =>
  [...rawValue].map(() => /[а-яА-Я\s]/);
