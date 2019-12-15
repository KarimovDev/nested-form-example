export type InputMask = InputMaskOptions | maskFunction | (string | RegExp)[];

interface InputMaskOptions {
  mask: (string | RegExp)[];
  showMask?: boolean;
  keepCharPositions?: boolean;
  guide?: boolean;
  charPos?: number;
}

type maskFunction = (rawValue: string) => RegExp[];

export interface MaritalStatus {
  value: string;
  gender: GENDER;
}

export enum GENDER {
  M = 'мужчина',
  W = 'женщина',
}
