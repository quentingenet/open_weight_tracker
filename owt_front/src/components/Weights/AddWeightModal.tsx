import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IWeight } from '../../models/IWeight';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { AddNewWeight as addNewWeightService } from '../../services/WeightService';
import Grid from '@mui/material/Grid';
import { useUserContext } from '../../contexts/UserContext';
import { calculateBmi } from '../../utils/WeightUtils';
import { Typography } from '@mui/material';
export default function AddWeightModal(props: any) {
    const { open, setOpen } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userContext = useUserContext();
    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object({
        weightValue: yup.number().required(),
        muscularMass: yup.number().required(),
        bodyFatMass: yup.number().required(),
        boneMass: yup.number().required(),
        waterMass: yup.number().required(),
        bmi: yup.number().required(),
    });

    const newWeightInitialValues: IWeight = {
        date: dayjs(),
        weightValue: 0,
        muscularMass: 0,
        bodyFatMass: 0,
        boneMass: 0,
        waterMass: 0,
        bmi: 0,
    };

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<IWeight>({
        defaultValues: newWeightInitialValues,
        resolver: yupResolver(validationSchema),
    });

    const dataNewWeight: IWeight = {
        date: newWeightInitialValues.date,
        weightValue: watch('weightValue'),
        muscularMass: watch('muscularMass'),
        bodyFatMass: watch('bodyFatMass'),
        boneMass: watch('boneMass'),
        waterMass: watch('waterMass'),
        bmi: calculateBmi(
            watch('weightValue'),
            userContext.height,
            userContext.isEuropeanUnitMeasure
        ),
    };

    const submitAddWeight = () => {
        if (isValid) {
            try {
                console.log('SUBMIT new weight', dataNewWeight);

                addNewWeightService(dataNewWeight).then((response) => {
                    setIsLoading(true);
                    if (response) {
                        setIsLoading(false);
                    }
                });
            } catch (error) {
                console.log('Incomplete form.');
            }
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(
                            (formData as FormData).entries()
                        );
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    {newWeightInitialValues.date
                        ? newWeightInitialValues.date?.format(
                              'DD/MM/YYYY hh:mm'
                          )
                        : 'New weight'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(submitAddWeight)}>
                        <Grid container justifyContent={'center'}>
                            <Grid
                                item
                                marginTop={3}
                                xs={10}
                                justifyContent={'center'}
                            >
                                <Controller
                                    name='weightValue'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='weightValue'
                                            label={
                                                userContext.isEuropeanUnitMeasure
                                                    ? 'Weight in Kg'
                                                    : 'Weight in Lbs'
                                            }
                                            type='number'
                                            variant='outlined'
                                            error={Boolean(errors.weightValue)}
                                            inputProps={{ step: 0.1 }}
                                        />
                                    )}
                                />
                                {errors.weightValue && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.weightValue.message}
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
                                    name='muscularMass'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='muscularMass'
                                            label={'% muscular mass'}
                                            type='number'
                                            variant='outlined'
                                            error={Boolean(errors.muscularMass)}
                                            inputProps={{ step: 0.1 }}
                                        />
                                    )}
                                />
                                {errors.muscularMass && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.muscularMass.message}
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
                                    name='bodyFatMass'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='bodyFatMass'
                                            label={'% body fat mass'}
                                            type='number'
                                            variant='outlined'
                                            error={Boolean(errors.bodyFatMass)}
                                            inputProps={{ step: 0.1 }}
                                        />
                                    )}
                                />
                                {errors.bodyFatMass && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.bodyFatMass.message}
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
                                    name='boneMass'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='boneMass'
                                            label={'% bone mass'}
                                            type='number'
                                            variant='outlined'
                                            error={Boolean(errors.boneMass)}
                                            inputProps={{ step: 0.1 }}
                                        />
                                    )}
                                />
                                {errors.boneMass && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.boneMass.message}
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
                                    name='waterMass'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='waterMass'
                                            label={'% water mass'}
                                            type='number'
                                            variant='outlined'
                                            error={Boolean(errors.waterMass)}
                                            inputProps={{ step: 0.1 }}
                                        />
                                    )}
                                />
                                {errors.waterMass && (
                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={10}>
                                            <span className='errorText'>
                                                {errors.waterMass.message}
                                            </span>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container justifyContent={'center'}>
                        <Grid item marginTop={2}>
                            <Typography textAlign={'center'}>
                                {dataNewWeight.bmi !== 0 &&
                                    'BMI = ' + dataNewWeight.bmi}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
