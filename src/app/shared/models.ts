import { Observable } from 'rxjs';

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

export interface Store extends Observable<StoreData> {
  dispatch?: nextFunction;
}

type nextFunction = (value?: any) => void;

export interface StoreData {
  name: string;
  gender: string;
  date: Date;
  status: string;
  childCounter: number;
  email: string;
  comment: string;
}
