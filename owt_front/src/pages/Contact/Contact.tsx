import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    InputAdornment,
    Snackbar,
    TextareaAutosize,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { IContactPublic } from '../../models/IContactPublic';
import { emailValidator } from '../../utils/Regex';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Email } from '@mui/icons-material';
import { contactPublic as contactService } from '../../services/UserService';
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import TitleOwt from '../../components/Utils/TitleOwt/TitleOwt';
export default function Contact() {
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [messageSent, setMessageSent] = useState<boolean>(false);

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    };

    const initialValueContact: IContactPublic = {
        email: '',
        messageToSend: '',
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validationSchema = yup.object({
        email: yup
            .string()
            .email()
            .matches(emailValidator, 'Email not valid')
            .required('Enter your email'),
        messageToSend: yup
            .string()
            .min(6, 'Message too short')
            .max(1000, "Message can't be longer than 1000 characters")
            .required('Enter your message'),
    });

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<IContactPublic>({
        defaultValues: initialValueContact,
        resolver: yupResolver(validationSchema),
    });

    const dataToSend: IContactPublic = {
        email: watch('email'),
        messageToSend: watch('messageToSend'),
    };

    const submitContact = async () => {
        if (isValid) {
            try {
                setIsLoading(true);
                const response = await contactService(dataToSend);
                if (response.ok) {
                    setMessageSent(true);
                    setOpenSnackBar(true);
                } else {
                    setMessageSent(false);
                    setOpenSnackBar(true);
                }
            } catch (error) {
                setMessageSent(false);
                setOpenSnackBar(true);
                console.error('Error while sending form', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            }
        }
    };

    return (
        <>
            <Grid container>
                <TitleOwt title='Contact' />
                <Grid
                    container
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{ margin: '0 auto' }}
                    xs={12}
                    md={10}
                    lg={6}
                >
                    <form
                        onSubmit={handleSubmit(submitContact)}
                        className='contactForm'
                    >
                        <Grid container justifyContent={'center'} xs={12}>
                            <Grid
                                item
                                marginTop={3}
                                xs={12}
                                justifyContent={'center'}
                                paddingX={1}
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
                            <Grid
                                item
                                marginTop={3}
                                xs={12}
                                padding={1}
                                justifyContent={'center'}
                            >
                                <Controller
                                    name='messageToSend'
                                    control={control}
                                    render={({ field }) => (
                                        <TextareaAutosize
                                            style={{
                                                height: '200px',
                                                width: '90%',
                                                padding: '10px',
                                                fontSize: '16px',
                                                fontFamily: 'Arial',
                                                backgroundColor: 'white',
                                                borderRadius: '5px',
                                            }}
                                            maxRows={15}
                                            maxLength={1000}
                                            minLength={6}
                                            {...field}
                                            id='messageToSend'
                                            placeholder='Here your message'
                                        />
                                    )}
                                />
                                {errors.messageToSend && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.messageToSend.message}
                                            </span>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Grid item marginY={3} xs={10}>
                                {isLoading ? (
                                    <CircularProgress color='primary' />
                                ) : (
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        size='large'
                                    >
                                        SUBMIT
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} marginTop={5}>
                <Grid item>
                    <Button
                        onClick={() => navigate('/')}
                        variant='contained'
                        color='primary'
                        size='large'
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
            {openSnackBar && (
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={messageSent ? 'success' : 'error'}
                        sx={{ width: '100%' }}
                    >
                        {messageSent
                            ? 'Message sent successfully!'
                            : 'Error while logging in. Try again.'}
                        '
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
