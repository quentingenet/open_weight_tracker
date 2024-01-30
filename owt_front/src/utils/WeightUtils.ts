export function calculateBmi(
    weight: number,
    height: number,
    isEuroopeanMeasure: boolean
): number {
    let bmi: number;
    {
        isEuroopeanMeasure
            ? // Calculate BMI using weight in kg and height in cm covnerted to meter
              (bmi = +(weight / (height / 100) ** 2).toFixed(1))
            : // Calculate BMI using weight in lbs and height in inches
              (bmi = +((weight / (height * height)) * 703).toFixed(1));
    }
    console.log('bmi ', bmi, 'weight ', weight, 'height', height / 100);
    return bmi;
}
