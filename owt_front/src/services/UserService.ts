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

// Assuming IRegisterForm interface is defined somewhere

export const register = async (dataRegister: IRegisterForm) => {
    // Creating an object with required data for registration
    const requestDataRegister = {
        username: dataRegister.username,
        email: dataRegister.email,
        password: dataRegister.password,
        is_accepted_terms: dataRegister.isAcceptedTerms,
    };

    // Using async/await for cleaner asynchronous code
    try {
        const response = await fetch(API_URL.concat('register/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataRegister),
        });

        if (response.ok) {
            const headers = response.headers;

            // Extracting JWT token from headers
            const jwt = headers.get('Authorization') || '';

            // Clearing old JWT from local storage
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
            }

            // Storing the new JWT in local storage
            localStorage.setItem('jwt', JSON.stringify(jwt));

            // Parsing and returning the JSON response
            return response.json();
        } else {
            throw new Error('Error during API request');
        }
    } catch (error) {
        throw new Error('Error calling API: ' + error);
    }
};

export const initData = (dataInitial: IInitialData) => {
    const requestDataInitial = {
        birthdate: dataInitial.birthdate,
        gender: dataInitial.gender,
        is_european_unit_measure: dataInitial.isEuropeanUnitMeasure,
        body_size: dataInitial.bodySize,
        goal_weight: dataInitial.goalWeight,
        initial_weight: dataInitial.initialWeight,
    };

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', ` ${localStorage.getItem('jwt')}`);

        fetch(API_URL.concat('init/first-connexion/'), {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestDataInitial),
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    if (response.status === 204) {
                        resolve(); // Pas de contenu dans la réponse
                    } else {
                        response
                            .text()
                            .then((text) => {
                                if (text.trim() === '') {
                                    // Traitez le cas d'une réponse vide comme nécessaire
                                    console.log(
                                        "La réponse est vide, mais le statut n'est pas 204."
                                    );
                                    resolve(); // Ou faites quelque chose d'autre en conséquence
                                } else {
                                    // Essayez de parser le texte en JSON
                                    try {
                                        resolve(JSON.parse(text));
                                    } catch (parseError) {
                                        reject({
                                            status: response.status,
                                            message:
                                                'Erreur de parsing JSON : ' +
                                                parseError,
                                        });
                                    }
                                }
                            })
                            .catch((error) => {
                                reject({
                                    status: response.status,
                                    message:
                                        'Erreur lors de la gestion de la réponse JSON : ' +
                                        error.message,
                                });
                            });
                    }
                } else {
                    response.json().then((errorData) => {
                        reject({
                            status: response.status,
                            message:
                                errorData.message ||
                                "Erreur lors de la requête à l'API",
                        });
                    });
                }
            })
            .catch((error) => {
                reject({
                    status: 500,
                    message:
                        "Erreur lors de l'appel à l'API : " + error.message,
                });
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
