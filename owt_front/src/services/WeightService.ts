import { IWeight } from '../models/IWeight';
import { API_URL } from '../utils/GlobalUtils';

export const AddNewWeight = async (dataWeight: IWeight, userJwt: string) => {
    try {
        const requestDataWeight = {
            weight_record_date: dataWeight.date,
            weight_value: Number(dataWeight.weightValue),
            muscular_mass: Number(dataWeight.muscularMass),
            fat_mass: Number(dataWeight.bodyFatMass),
            bone_mass: Number(dataWeight.boneMass),
            body_water: Number(dataWeight.waterMass),
            bmi: Number(dataWeight.bmi),
        };
        console.log('JWT FROM WEIGHT SERVICE', localStorage.getItem('jwt'));
        let jwt = localStorage.getItem('jwt') || '';
        if (jwt.startsWith('"')) {
            jwt = jwt.slice(1, -1);
        }
        if (!jwt.startsWith('Bearer')) {
            jwt = ('Bearer ' + jwt).replace(/['"]+/g, '');
        }
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: jwt,
        });
        console.log('jwt from weight service AFTER REPLACE', jwt);
        const response = await fetch(API_URL.concat('weights/create_weight/'), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestDataWeight),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            throw new Error('Response is not in JSON format');
        }
    } catch (error) {
        throw new Error('Error during API request: ' + error);
    }
};
