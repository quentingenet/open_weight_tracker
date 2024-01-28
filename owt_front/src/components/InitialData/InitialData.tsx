import Radio from '@mui/material/Radio';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const InitialData: React.FC = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [valueGender, setValueGender] = useState('M');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueGender((event.target as HTMLInputElement).value);
    };

    const initialWeightValues = [
        {
            value: 50,
            label: '50 Kg',
        },
        {
            value: 200,
            label: '200 Kg',
        },
    ];

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

    function valueinitialWeightValuesText(value: number) {
        return `${value}Kg`;
    }

    function valuetextEU(value: number) {
        return `${value}Kg`;
    }
    const [valueBirthdate, setValueBirthdate] = React.useState<Dayjs | null>(
        dayjs('1985-09-18')
    );

    const initialValues: IInitialData = {
        birthdate: dayjs(), //date now
        gender: Gender.Male,
        isEuropeanUnitMeasure: false,
        bodySize: 175,
        goalWeight: 80,
        initialWeight: 85,
    };

    const validationSchema = yup.object({
        isEuropeanUnitMeasure: yup.boolean().required('Select an unit measure'),
        gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
        bodySize: yup
            .number()
            .positive()
            .integer()
            .min(100)
            .max(250)
            .required('Enter your body size'),
        initialWeight: yup.number().required('Enter your initial weight'),
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
        initialWeight: 90,
    };

    const submitInitialDataRegister = () => {
        if (isValid) {
            try {
                console.log('SUBMIT INITIAL DATA', dataInitial);
                setIsLoading(true);
                initDataService(dataInitial).then((response) => {
                    if (response) {
                        setIsLoading(false);
                        userContext.setIsFirstConnection(false);
                        userContext.setIsUserLoggedIn(true);
                        console.log(
                            'IS USER LOGGEDIN',
                            userContext.isUserLoggedIn
                        );
                        navigate('/');
                    }
                });
            } catch (error) {
                console.log('Incomplete form.');
            }
        }
    };

    return (
        <>
            <form
                className='register-form-input'
                onSubmit={handleSubmit(submitInitialDataRegister)}
            >
                <Grid container marginTop={3} justifyContent={'center'}>
                    <Grid container marginTop={2} justifyContent={'center'}>
                        <Grid item xs={10}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name='birthdate'
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                },
                                            }}
                                            format='YYYY-MM-DD'
                                            minDate={dayjs('1920-01-01')}
                                            maxDate={dayjs()}
                                            defaultValue={dayjs('1985-09-18')}
                                            label='Date of birth'
                                            value={valueBirthdate}
                                            onChange={(newValue) => {
                                                setValueBirthdate(newValue);
                                                field.onChange(newValue);
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container marginTop={2} justifyContent={'center'}>
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
                                            onChange={handleChangeGender}
                                        >
                                            <Grid
                                                container
                                                justifyContent={'center'}
                                                flexDirection={'row'}
                                            >
                                                <FormControlLabel
                                                    value={Gender.Male}
                                                    control={<Radio />}
                                                    label='Male'
                                                />
                                                <FormControlLabel
                                                    value={Gender.Female}
                                                    control={<Radio />}
                                                    label='Female'
                                                />
                                                <FormControlLabel
                                                    value={Gender.Neutral}
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
                            <Typography color={'black'}>{'Lbs/In'}</Typography>
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
                                        checked={watch('isEuropeanUnitMeasure')}
                                    />
                                )}
                            />

                            <Typography color={'black'}>{'Kg/Cm'}</Typography>
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
                                <Grid container justifyContent={'center'}>
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
                        <Grid container marginTop={2} justifyContent={'center'}>
                            <Grid item xs={10}>
                                <Typography color={'#555458'}>
                                    {'Initial weight'}
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
                                    name='initialWeight'
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
                                                valueinitialWeightValuesText
                                            }
                                            step={1}
                                            value={watch('initialWeight')}
                                            marks={initialWeightValues}
                                            valueLabelDisplay='on'
                                        />
                                    )}
                                />
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
                                                getAriaValueText={valuetextEU}
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
                </Grid>
            </form>
        </>
    );
};

export default InitialData;
