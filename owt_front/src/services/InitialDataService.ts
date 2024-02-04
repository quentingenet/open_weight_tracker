import { API_URL } from '../utils/GlobalUtils';

export const getInitialData = async () => {
    try {
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

        const response = await fetch(
            API_URL.concat('initialdata/get_weights'),
            {
                method: 'GET',
                headers: headers,
            }
        );

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
