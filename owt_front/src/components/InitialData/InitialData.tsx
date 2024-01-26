import { CalendarMonth } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    RadioGroup,
    Slider,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './InitialData.css';
import { useUserContext } from '../../contexts/UserContext';
import { initData as initDataService } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Gender, IInitialData } from '../../models/IInitialData';

export const InitialData = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [valueGender, setValueGender] = useState('M');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueGender((event.target as HTMLInputElement).value);
    };

    const currentYear = new Date().getFullYear();

    const marksEU = [
        {
            value: 50,
            label: '50 Kg',
        },
        {
            value: 200,
            label: '200 Kg',
        },
    ];

    function valuetextEU(value: number) {
        return `${value}Kg`;
    }

    const initialValues: IInitialData = {
        birthdate: new Date(currentYear - 20, 0, 1),
        gender: Gender.Male,
        isEuropeanUnitMeasure: false,
        bodySize: 175,
        goalWeight: 80,
    };

    const validationSchema = yup.object({
        birthdate: yup
            .date()
            .min(Date.now(), 'Birth year must be greater than 1900')
            .required('Enter your year of birth'),
        isEuropeanUnitMeasure: yup.boolean().required('Select an unit measure'),
        gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
        bodySize: yup
            .number()
            .positive()
            .integer()
            .min(100)
            .max(250)
            .required('Enter your body size'),
        goalWeight: yup.number().required('Enter a goal weight'),
    });

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<IInitialData>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const dataInitial: IInitialData = {
        birthdate: watch('birthdate'),
        gender: watch('gender'),
        isEuropeanUnitMeasure: watch('isEuropeanUnitMeasure'),
        bodySize: watch('bodySize'),
        goalWeight: watch('goalWeight'),
    };

    const submitInitialDataRegister = () => {
        console.log(dataInitial);
        if (isValid) {
            try {
                setIsLoading(true);
                initDataService(dataInitial).then((response) => {
                    if (response) {
                        const localStorageJwt =
                            localStorage.getItem('jwt') || '';
                        userContext.setJwt(localStorageJwt);
                        setIsLoading(false);
                        if (userContext.isFirstConnection) {
                            //On ouvre une Modal pour init les
                        }
                        userContext.setIsUserLoggedIn(true);
                        navigate('/dashboard');
                    }
                });
            } catch (error) {
                console.log('Incomplete form.');
            }

            return (
                <>
                    <form onSubmit={handleSubmit(submitInitialDataRegister)}>
                        <Grid container marginTop={3} justifyContent={'center'}>
                            <Grid container justifyContent={'center'}>
                                <Grid item marginTop={2} xs={10}>
                                    <Controller
                                        name='birthdate'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id='birthdate'
                                                label='Year birth'
                                                type='number'
                                                variant='outlined'
                                                error={Boolean(
                                                    errors.birthdate
                                                )}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <CalendarMonth />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.birthdate && (
                                        <Grid
                                            container
                                            justifyContent={'center'}
                                        >
                                            <Grid item xs={10}>
                                                <span className='errorText'>
                                                    {errors.birthdate.message}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                marginTop={2}
                                justifyContent={'center'}
                            >
                                <Grid item xs={10}>
                                    <Controller
                                        name='gender'
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl>
                                                <Grid justifyContent={'center'}>
                                                    <FormLabel id='demo-radio-buttons-group-label'>
                                                        Gender
                                                    </FormLabel>
                                                </Grid>
                                                <RadioGroup
                                                    {...field}
                                                    aria-labelledby='demo-radio-buttons-group-label'
                                                    name='radio-buttons-group'
                                                    sx={{ color: 'black' }}
                                                    value={valueGender}
                                                    onChange={
                                                        handleChangeGender
                                                    }
                                                >
                                                    <Grid
                                                        container
                                                        justifyContent={
                                                            'center'
                                                        }
                                                        flexDirection={'row'}
                                                    >
                                                        <FormControlLabel
                                                            value={Gender.Male}
                                                            control={<Radio />}
                                                            label='Male'
                                                        />
                                                        <FormControlLabel
                                                            value={
                                                                Gender.Female
                                                            }
                                                            control={<Radio />}
                                                            label='Female'
                                                        />
                                                        <FormControlLabel
                                                            value={
                                                                Gender.Neutral
                                                            }
                                                            control={<Radio />}
                                                            label='Neutral'
                                                        />
                                                    </Grid>
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'}>
                                <Grid item xs={10} marginTop={1}>
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <Typography color={'#555458'}>
                                                Units measurements
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Typography color={'black'}>
                                        {'Lbs/In'}
                                    </Typography>
                                    <Controller
                                        name='isEuropeanUnitMeasure'
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <Switch
                                                {...field}
                                                size='medium'
                                                inputProps={{
                                                    'aria-label': 'ant design',
                                                }}
                                                checked={watch(
                                                    'isEuropeanUnitMeasure'
                                                )}
                                            />
                                        )}
                                    />

                                    <Typography color={'black'}>
                                        {'Kg/Cm'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'}>
                                <Grid item marginTop={2} xs={10}>
                                    <Controller
                                        name='bodySize'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id='bodySize'
                                                label='Body size (cm or inch)'
                                                type='number'
                                                variant='outlined'
                                                error={Boolean(errors.bodySize)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            {watch(
                                                                'isEuropeanUnitMeasure'
                                                            )
                                                                ? 'cm'
                                                                : 'inch'}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.bodySize && (
                                        <Grid
                                            container
                                            justifyContent={'center'}
                                        >
                                            <Grid item xs={10}>
                                                <span className='errorText'>
                                                    {errors.bodySize.message}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'}>
                                <Grid
                                    container
                                    marginTop={2}
                                    justifyContent={'center'}
                                >
                                    <Grid item xs={10}>
                                        <Typography color={'#555458'}>
                                            {'Goal weight'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent={'center'}>
                                    <Grid
                                        item
                                        xs={10}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        paddingX={{ xs: 5, md: 15 }}
                                        marginTop={4}
                                    >
                                        <Controller
                                            name='goalWeight'
                                            control={control}
                                            render={({ field }) => (
                                                <Slider
                                                    {...field}
                                                    aria-label='Always visible'
                                                    size='medium'
                                                    defaultValue={85}
                                                    min={50}
                                                    max={200}
                                                    getAriaValueText={
                                                        valuetextEU
                                                    }
                                                    step={1}
                                                    value={watch('goalWeight')}
                                                    marks={marksEU}
                                                    valueLabelDisplay='on'
                                                />
                                            )}
                                        />
                                    </Grid>
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
                                            USE OWT NOW
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </>
            );
        }
    };
};
export default InitialData;
