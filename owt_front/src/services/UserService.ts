import { IContactPublic } from '../models/IContactPublic';
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Error while making request to the API'
            );
        }

        const responseData = await response.json();
        const accessToken = responseData.access;
        const height = responseData.height;
        localStorage.setItem('jwt', accessToken);
        localStorage.setItem('height', height);

        return {
            status: response.status,
            data: responseData,
        };
    } catch (error) {
        throw new Error('Error while calling the API: ' + error);
    }
};

export const register = async (dataRegister: IRegisterForm) => {
    const requestDataRegister = {
        username: dataRegister.username,
        email: dataRegister.email,
        password: dataRegister.password,
        is_accepted_terms: dataRegister.isAcceptedTerms,
    };

    try {
        const response = await fetch(API_URL.concat('users/register_user_step_one/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestDataRegister),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la requête à l'API");
        }

        const jwt = response.headers.get('Authorization') || '';

        const localStorageJwt = localStorage.getItem('jwt');
        if (localStorageJwt) {
            localStorage.removeItem('jwt');
        }

        if (jwt) {
            localStorage.setItem('jwt', JSON.stringify(jwt));
        } else {
            throw new Error("Le JWT n'est pas présent dans les en-têtes de la réponse.");
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error during API request: ' + error);
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
        console.log('jwt from initdata service', localStorage.getItem('jwt'));
        const response = await fetch(
            API_URL.concat('users/register_user_step_two/'),
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(requestDataInitial),
            }
        );

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
    const emailUser = { emailUser: emailResetPassword };

    return fetch(API_URL.concat('password-reset/generate_reset_token/'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailUser),
    });
};

export const resetPasswordProcess = (
    newResetPassword: string,
    token: string
) => {
    console.log("TOKEN from service ", token);
    const newPasswordData = { new_password: newResetPassword, token: token };
    return fetch(API_URL.concat('users/update_new_password/'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPasswordData),
    });
};

export const contactPublic = async (dataToSend: IContactPublic) => {
    try {
        const data = {
            email: dataToSend.email,
            message: dataToSend.messageToSend,
        };
        const response = await fetch(
            API_URL.concat('contact/send_contact_message/'),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to send contact message');
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
