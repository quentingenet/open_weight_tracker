import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { IChangeResetPassword } from '../../models/IChangeResetPassword';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    passwordWithLetter,
    passwordWithNumber,
    passwordAtLeast4,
} from '../../utils/Regex';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetAndChangePassword } from '../../services/UserService';

export default function ResetChangePassword() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const resetPasswordInitialValues: IChangeResetPassword = {
        password: '',
        passwordBis: '',
    };

    const validationSchema = yup.object({
        password: yup
            .string()
            .required('You must enter your password.')
            .matches(passwordWithLetter, 'Your password must contain a letter.')
            .matches(passwordWithNumber, 'Your password must contain a number.')
            .matches(
                passwordAtLeast4,
                'Your password must contain at least 4 characters.'
            ),
        passwordBis: yup
            .string()
            .required('You must enter your password.')
            .matches(passwordWithLetter, 'Your password must contain a letter.')
            .matches(passwordWithNumber, 'Your password must contain a number.')
            .matches(
                passwordAtLeast4,
                'Your password must contain at least 4 characters.'
            )
            .oneOf(
                [yup.ref('passwordChanged'), ''],
                'The password confirmation must correspond to the chosen password.'
            ),
    });

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<IChangeResetPassword>({
        defaultValues: resetPasswordInitialValues,
        resolver: yupResolver(validationSchema),
    });

    const dataResetPassword: IChangeResetPassword = {
        password: watch('password'),
        passwordBis: watch('passwordBis'),
    };

    const submitResetPassword = () => {
        if (isValid) {
            try {
                resetAndChangePassword(dataResetPassword.password);
                navigate('/');
            } catch (error) {
                console.log('Incomplete form.');
            }
        }
    };

    return (
        <>
            <Grid container marginTop={3} justifyContent={'center'}>
                <Grid item xs={12}>
                    <form
                        onSubmit={handleSubmit(submitResetPassword)}
                        className='reset-password-form'
                    >
                        <Grid item marginY={3} xs={12}>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='passwordChanged'
                                        label='New password'
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
                            {errors.password && (
                                <Grid item xs={12}>
                                    <span className='errorText'>
                                        {errors.password.message}
                                    </span>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item marginY={3} xs={12}>
                            <Controller
                                name='passwordBis'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='passwordChangedBis'
                                        label='New password confirmation'
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
                                <Grid item xs={12}>
                                    <span className='errorText'>
                                        {errors.passwordBis.message}
                                    </span>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}
