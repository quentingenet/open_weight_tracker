import { IInitialData } from '../models/IInitialData';
import { ILoginForm } from '../models/ILoginForm';
import { IRegisterForm } from '../models/IRegisterForm';
import { API_URL } from '../utils/GlobalUtils';

export const login = async (data: ILoginForm) => {
    const requestDataLogin = {
        username: data.username,
        password: data.password,
    };

    try {
        const response = await fetch(API_URL.concat('token/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataLogin),
        });

        if (response.ok) {
            const jwt = response.headers.get('Authorization') || '';

            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }

            localStorage.setItem('jwt', JSON.stringify(jwt));
            return response.json();
        } else {
            throw new Error("Erreur lors de la requête à l'API");
        }
    } catch (error) {
        throw new Error("Erreur lors de l'appel à l'API :" + error);
    }
};

export const register = async (dataRegister: IRegisterForm) => {
    try {
        const requestDataRegister = {
            username: dataRegister.username,
            email: dataRegister.email,
            password: dataRegister.password,
            is_accepted_terms: dataRegister.isAcceptedTerms,
        };

        const response = await fetch(API_URL.concat('register/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataRegister),
        });

        if (response.ok) {
            const jwt = response.headers.get('Authorization') || '';

            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }

            localStorage.setItem('jwt', JSON.stringify(jwt));

            return response.json();
        } else {
            throw new Error('Error during API request');
        }
    } catch (error) {
        throw new Error('Error during API request : ' + error);
    }
};

export const initData = async (dataInitial: IInitialData) => {
    try {
        const requestDataInitial = {
            birthdate: dataInitial.birthdate,
            sex: dataInitial.sex,
            is_european_unit_measure: dataInitial.isEuropeanUnitMeasure,
            height: dataInitial.height,
            goal_weight: dataInitial.goalWeight,
            initial_weight: dataInitial.initialWeight,
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', ` ${localStorage.getItem('jwt')}`);

        const response = await fetch(API_URL.concat('init/first-connexion/'), {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestDataInitial),
        });

        if (response.ok) {
            console.log(response);

            if (response.status === 204) {
                return Promise.resolve();
            } else {
                const text = await response.text();

                if (text.trim() === '') {
                    return Promise.resolve();
                } else {
                    try {
                        return Promise.resolve(JSON.parse(text));
                    } catch (parseError) {
                        throw {
                            status: 500,
                            message: 'Erreur de parsing JSON : ' + parseError,
                        };
                    }
                }
            }
        } else {
            const errorData = await response.json();
            throw {
                status: response.status,
                message:
                    errorData.message || "Erreur lors de la requête à l'API",
            };
        }
    } catch (error) {
        throw {
            status: 500,
            message: "Erreur lors de l'appel à l'API : " + error,
        };
    }
};

export const resetAndChangePassword = (emailResetPassword: string) => {
    const emailUser = emailResetPassword;

    return fetch(API_URL.concat('resetPassword'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailUser),
    });
};
