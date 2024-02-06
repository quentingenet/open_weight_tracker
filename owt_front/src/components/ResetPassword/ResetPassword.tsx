import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Supposons que vous avez une fonction resetPassword dans votre fichier d'API
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material';
import { resetPasswordProcess } from '../../services/UserService';
import { Controller } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    passwordAtLeast4,
    passwordWithLetter,
    passwordWithNumber,
} from '../../utils/Regex';
import { IChangeResetPassword } from '../../models/IChangeResetPassword';
import './ResetPassword.css';

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    useEffect(() => {
        const tokenFromUrl = location.pathname.split('/').pop() || '';
        setToken(tokenFromUrl);
    }, [location]);

    const initialRegisterValues: IChangeResetPassword = {
        password: '',
        passwordBis: '',
    };

    const validationSchema = yup.object({
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
    } = useForm<IChangeResetPassword>({
        defaultValues: initialRegisterValues,
        resolver: yupResolver(validationSchema),
    });

    const dataRegister: IChangeResetPassword = {
        password: watch('password'),
        passwordBis: watch('passwordBis'),
    };

    const submitResetPassword = async () => {
        if (isValid) {
            try {
                const password = dataRegister.password;
                //setIsLoading(true);

                const response = await resetPasswordProcess(password, token);

                if (response.status === 200) {
                    alert('Your password has been reset successfully');
                    navigate('/');
                } else {
                    alert('An error occurred while resetting your password');
                }
            } catch (error) {
                console.error('Error while resetting your password  :', error);
            }
        }
    };
    return (
        <Grid
            container
            marginTop={6}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid item>
                <h1>Open Weight Tracker</h1>
            </Grid>
            <Grid item>
                <h2>Reset your password</h2>
            </Grid>
            <form
                onSubmit={handleSubmit(submitResetPassword)}
                className='resetPasswordFormInput'
            >
                <Grid item xs={12} marginY={3}>
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id='password'
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                variant='outlined'
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
                        <Grid item xs={12}>
                            <span className='errorText'>
                                {errors.password.message}
                            </span>
                        </Grid>
                    )}
                </Grid>

                <Grid item marginTop={2} xs={12}>
                    <Controller
                        name='passwordBis'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id='passwordBis'
                                label='Confirm password'
                                type={showPassword ? 'text' : 'password'}
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
                <Grid item xs={12} marginY={3}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                    >
                        RESET PASSWORD
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}

export default ResetPassword;
