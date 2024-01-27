export enum Gender {
    Male = 'M',
    Female = 'F',
    Neutral = 'N',
}

export interface IInitialData {
    birthdate: Date;
    gender: Gender;
    isEuropeanUnitMeasure: boolean;
    bodySize: number;
    goalWeight: number;
    initialWeight: number;
}
