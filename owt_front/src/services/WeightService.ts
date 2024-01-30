import { IWeight } from '../models/IWeight';
import { API_URL } from '../utils/GlobalUtils';

export const AddNewWeight = async (dataWeight: IWeight) => {
    try {
        const requestDataWeight: IWeight = {
            weightValue: dataWeight.weightValue,
            muscularMass: dataWeight.muscularMass,
            bodyFatMass: dataWeight.bodyFatMass,
            boneMass: dataWeight.boneMass,
            waterMass: dataWeight.waterMass,
            bmi: dataWeight.bmi,
        };

        const response = await fetch(API_URL.concat('weights/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataWeight),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error during API request');
        }
    } catch (error) {
        throw new Error('Error during API request : ' + error);
    }
};
