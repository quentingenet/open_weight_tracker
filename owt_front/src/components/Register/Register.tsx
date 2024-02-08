import { Person2, VisibilityOff, Visibility, Email } from '@mui/icons-material';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { IRegisterForm } from '../../models/IRegisterForm';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    emailValidator,
    passwordAtLeast4,
    passwordWithLetter,
    passwordWithNumber,
} from '../../utils/Regex';
import './Register.css';
import { useUserContext } from '../../contexts/UserContext';
import { register as registerService } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import ModalOwt from '../Modal/ModalOwt';

export const Register = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openTermsModal, setOpenTermsModal] = useState(false);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const initialRegisterValues: IRegisterForm = {
        username: '',
        email: '',
        password: '',
        passwordBis: '',
        isAcceptedTerms: false,
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .min(3, 'Username must contain at least 3 characters')
            .matches(/^[a-z0-9]+$/, 'Must be to lowercase')
            .required('Enter your username'),
        email: yup
            .string()
            .email()
            .matches(emailValidator, 'Email not valid')
            .required('Enter your email'),
        isAcceptedTerms: yup
            .boolean()
            .required('You must accept terms to use OWT'),
        password: yup
            .string()
            .required('Enter your password.')
            .matches(passwordWithLetter, 'Your password must contain a letter')
            .matches(passwordWithNumber, 'Your password must contain a number')
            .matches(
                passwordAtLeast4,
                'Your password must contain at least 4 characters'
            ),
        passwordBis: yup
            .string()
            .required('Enter your password.')
            .matches(passwordWithLetter, 'Your password must contain a letter')
            .matches(passwordWithNumber, 'Your password must contain a number')
            .matches(
                passwordAtLeast4,
                'Your password must contain at least 4 characters'
            )
            .oneOf(
                [yup.ref('password'), ''],
                'The password confirmation must correspond to the chosen password'
            ),
    });

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<IRegisterForm>({
        defaultValues: initialRegisterValues,
        resolver: yupResolver(validationSchema),
    });

    const dataRegister: IRegisterForm = {
        username: watch('username'),
        email: watch('email'),
        password: watch('password'),
        passwordBis: watch('passwordBis'),
        isAcceptedTerms: watch('isAcceptedTerms'),
    };

    const submitRegister = async () => {
        if (isValid) {
            try {
                setIsLoading(true);

                const response = await registerService(dataRegister);

                console.log(
                    'Response from registerService in submitRegister:',
                    response
                );

                if (response) {
                    const localStorageJwt = localStorage.getItem('jwt') || '';

                    if (localStorageJwt !== null && localStorageJwt !== '') {
                        userContext.setJwt(
                            localStorageJwt.startsWith('Bearer')
                                ? localStorageJwt
                                : `Bearer ${localStorageJwt}`
                        );

                        setIsLoading(false);
                        userContext.setIsFirstConnection(true);
                        userContext.setIsUserLoggedIn(false);
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error("Erreur lors de l'inscription :", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
    };

    return (
        <>
            <Grid
                container
                justifyContent={'center'}
                margin={'auto'}
                xs={12}
                md={10}
                lg={4}
            >
                <form
                    onSubmit={handleSubmit(submitRegister)}
                    className='register-form-input'
                >
                    <Grid container justifyContent={'center'}>
                        <Grid
                            item
                            marginTop={3}
                            xs={10}
                            justifyContent={'center'}
                        >
                            <Controller
                                name='username'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='username'
                                        label='Username'
                                        type='text'
                                        variant='outlined'
                                        error={Boolean(errors.username)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Person2 />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.username && (
                                <Grid container justifyContent={'center'}>
                                    <Grid item xs={10}>
                                        <span className='errorText'>
                                            {errors.username.message}
                                        </span>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container justifyContent={'center'}>
                        <Grid
                            item
                            marginTop={3}
                            xs={10}
                            justifyContent={'center'}
                        >
                            <Controller
                                name='email'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='email'
                                        label='Email'
                                        type='email'
                                        variant='outlined'
                                        error={Boolean(errors.email)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Email />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.email && (
                                <Grid container justifyContent={'center'}>
                                    <Grid item xs={10}>
                                        <span className='errorText'>
                                            {errors.email.message}
                                        </span>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container justifyContent={'center'}>
                        <Grid item marginTop={2} xs={10}>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='password'
                                        label='Password'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        variant='outlined'
                                        error={Boolean(errors.password)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge='end'
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.password && (
                                <Grid container justifyContent={'center'}>
                                    <Grid item xs={10}>
                                        <span className='errorText'>
                                            {errors.password.message}
                                        </span>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid item marginTop={2} xs={10}>
                            <Controller
                                name='passwordBis'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='passwordBis'
                                        label='Confirm password'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        variant='outlined'
                                        error={Boolean(errors.passwordBis)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge='end'
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.passwordBis && (
                                <Grid container justifyContent={'center'}>
                                    <Grid item xs={10}>
                                        <span className='errorText'>
                                            {errors.passwordBis.message}
                                        </span>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginTop={3}
                    >
                        <Grid container justifyContent={'center'}>
                            <Grid
                                item
                                justifyContent={'center'}
                                sx={{ color: 'black', fontSize: '0.8em' }}
                            >
                                <Typography paddingX={{ xs: 8, lg: 8 }}>
                                    I confirm that I have read, understood, and
                                    accepted
                                </Typography>
                                <Button onClick={() => setOpenTermsModal(true)}>
                                    Terms and conditions
                                </Button>
                                <ModalOwt
                                    openTermsModal={openTermsModal}
                                    setOpenTermsModal={setOpenTermsModal}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Grid item xs={10} mb={2} sx={{ color: 'black' }}>
                                <Controller
                                    name='isAcceptedTerms'
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            {...field}
                                            required={
                                                watch('isAcceptedTerms')
                                                    ? false
                                                    : true
                                            }
                                            label={'I agree'}
                                            value={true}
                                            control={<Checkbox />}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid item marginBottom={2} xs={10}>
                            {isLoading ? (
                                <CircularProgress color='primary' />
                            ) : (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                >
                                    Register
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};
export default Register;
