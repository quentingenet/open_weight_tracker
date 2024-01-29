import { Dayjs } from 'dayjs';

export enum Sex {
    Male = 'M',
    Female = 'F',
}

export interface IInitialData {
    birthdate: Dayjs;
    sex: Sex;
    isEuropeanUnitMeasure: boolean;
    height: number;
    goalWeight: number;
    initialWeight: number;
}
