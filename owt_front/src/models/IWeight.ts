import { Dayjs } from 'dayjs';

export interface IWeight {
    date?: Dayjs;
    weightValue: number;
    muscularMass: number;
    bodyFatMass: number;
    boneMass: number;
    waterMass: number;
    bmi: number;
}
