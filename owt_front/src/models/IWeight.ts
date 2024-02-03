import { Dayjs } from 'dayjs';

export interface IWeight {
    id?: number;
    date?: Dayjs;
    weightValue: number;
    muscularMass: number;
    bodyFatMass: number;
    boneMass: number;
    waterMass: number;
    bmi: number;
}
