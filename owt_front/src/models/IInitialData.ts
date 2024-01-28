import { Dayjs } from 'dayjs';

export enum Gender {
    Male = 'M',
    Female = 'F',
}

export interface IInitialData {
    birthdate: Dayjs;
    gender: Gender;
    isEuropeanUnitMeasure: boolean;
    bodySize: number;
    goalWeight: number;
    initialWeight: number;
}
