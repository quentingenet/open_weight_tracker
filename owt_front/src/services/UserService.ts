import { IInitialData } from '../models/IInitialData';
import { ILoginForm } from '../models/ILoginForm';
import { IRegisterForm } from '../models/IRegisterForm';
import { API_URL } from '../utils/GlobalUtils';

export const login = (data: ILoginForm) => {
    const requestDataLogin = {
        username: data.username,
        password: data.password,
    };
    return new Promise((resolve, reject) => {
        fetch(API_URL.concat('token/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataLogin),
        })
            .then((response) => {
                if (response.ok) {
                    const headers = response.headers;
                    const jwt = headers.get('Authorization') || '';
                    if (localStorage.getItem('jwt')) {
                        localStorage.removeItem('jwt');
                    }
                    localStorage.setItem('jwt', JSON.stringify(jwt));
                    resolve(response.json());
                } else {
                    throw new Error("Erreur lors de la requête à l'API");
                }
            })
            .catch((error) => {
                reject(new Error("Erreur lors de l'appel à l'API :" + error));
            });
    });
};

export const register = (dataRegister: IRegisterForm) => {
    const requestDataRegister = {
        //step one
        username: dataRegister.username,
        email: dataRegister.email,
        password: dataRegister.password,
        is_accepted_terms: dataRegister.isAcceptedTerms,
    };

    return new Promise((resolve, reject) => {
        fetch(API_URL.concat('register/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataRegister),
        })
            .then((response) => {
                if (response.ok) {
                    const headers = response.headers;
                    const jwt = headers.get('Authorization') || '';
                    if (localStorage.getItem('jwt')) {
                        localStorage.removeItem('jwt');
                    }
                    localStorage.setItem('jwt', JSON.stringify(jwt));
                    resolve(response.json());
                } else {
                    throw new Error("Erreur lors de la requête à l'API");
                }
            })
            .catch((error) => {
                reject(new Error("Erreur lors de l'appel à l'API :" + error));
            });
    });
};

export const initData = (dataInitial: IInitialData) => {
    //step two
    const requestDataInitial = {
        birthdate: dataInitial.birthdate,
        gender: dataInitial.gender,
        isEuropeanUnitMeasure: dataInitial.isEuropeanUnitMeasure,
        bodySize: dataInitial.bodySize,
        goalWeight: dataInitial.goalWeight,
    };
    return new Promise((resolve, reject) => {
        fetch(API_URL.concat('/init/first-connexion/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataInitial),
        })
            .then((response) => {
                if (response.ok) {
                    const headers = response.headers;
                    const jwt = headers.get('Authorization') || '';
                    if (localStorage.getItem('jwt')) {
                        localStorage.removeItem('jwt');
                    }
                    localStorage.setItem('jwt', JSON.stringify(jwt));
                    resolve(response.json());
                } else {
                    throw new Error("Erreur lors de la requête à l'API");
                }
            })
            .catch((error) => {
                reject(new Error("Erreur lors de l'appel à l'API :" + error));
            });
    });
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
