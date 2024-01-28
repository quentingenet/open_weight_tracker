import { Dayjs } from 'dayjs';

export enum Gender {
    Male = 'M',
    Female = 'F',
    Neutral = 'N',
}

export interface IInitialData {
    birthdate?: Dayjs | null;
    gender: Gender;
    isEuropeanUnitMeasure: boolean;
    bodySize: number;
    goalWeight: number;
    initialWeight: number;
}
