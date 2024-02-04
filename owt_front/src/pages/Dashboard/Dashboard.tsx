import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Grid, Tooltip } from '@mui/material';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip as ToolTipChartJS,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { getWeights } from '../../services/WeightService';
import { useUserContext } from '../../contexts/UserContext';
import { IWeight } from '../../models/IWeight';
import dayjs from 'dayjs';
import { getInitialData } from '../../services/InitialDataService';
import { IInitialData } from '../../models/IInitialData';

export default function Dashboard() {
    ChartJS.register(ArcElement, ToolTipChartJS, Legend);
    const userContext = useUserContext();
    const [initialData, setInitialData] = useState<IInitialData[]>([]);
    const [weightsData, setWeightsData] = useState<IWeight[]>([]);
    const lastWeight = weightsData[weightsData.length - 1];

    const fetchWeights = async () => {
        try {
            const response = await getWeights().then((res) => {
                console.log('res', res);
                const transformedData = res.map((weight: any) => ({
                    weightValue: weight.weight_value,
                    date: weight.weight_record_date,
                    bmi: weight.bmi,
                }));
                console.log('transformedData', transformedData);
                return setWeightsData(transformedData);
            });
        } catch (error) {
            console.error('Failed to fetch weights:', error);
        }
    };

    const fetchInitialData = async () => {
        try {
            const response = await getInitialData().then((res) => {
                console.log('res', res);
                const transformedInitialData = res.map((initialData: any) => ({
                    goalWeight: initialData.goal_weight,
                    initialWeight: initialData.initial_weight,
                    height: initialData.height,
                    age: initialData.age,
                }));
                console.log('transformedInitialData', transformedInitialData);
                return setInitialData(transformedInitialData);
            });
        } catch (error) {
            console.error('Failed to fetch weights:', error);
        }
    };

    useEffect(() => {
        fetchWeights();
        fetchInitialData();
    }, []);

    const leftToGoal = (
        lastWeight?.weightValue - initialData[0]?.goalWeight
    ).toFixed(1);
    return (
        <>
            <Grid container marginTop={{ xs: 3, lg: 6 }}>
                <Grid item xs={12} justifyContent={'center'}>
                    <Typography variant='h4' component='h2'>
                        Personal dashboard
                    </Typography>
                </Grid>
                <Grid
                    container
                    marginTop={4}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'row'}
                    gap={2}
                >
                    <Grid item xs={3}>
                        <Tooltip title='Check my weight stats'>
                            <Card
                                elevation={12}
                                sx={{
                                    minWidth: 250,
                                    maxWidth: 300,
                                    height: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                        }}
                                        color='text.secondary'
                                    >
                                        Last weight
                                    </Typography>
                                    <Divider />
                                    <Typography
                                        variant='h5'
                                        component='div'
                                    ></Typography>
                                    <Typography color='text.secondary'>
                                        {dayjs(lastWeight?.date).format(
                                            'DD/MM/YYYY hh:mm A'
                                        )}
                                    </Typography>
                                    <Typography variant='h5'>
                                        {lastWeight?.weightValue}
                                        {userContext.isEuropeanUnitMeasure
                                            ? ' kg'
                                            : ' lbs'}
                                    </Typography>

                                    <Typography variant='h6'>
                                        BMI: {lastWeight?.bmi}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={3}>
                        <Tooltip title='Check my initial data'>
                            <Card
                                elevation={12}
                                sx={{
                                    minWidth: 250,
                                    maxWidth: 300,
                                    height: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{
                                            fontSize: 22,
                                            fontWeight: 'bold',
                                        }}
                                        color='text.secondary'
                                    >
                                        Goal weight
                                    </Typography>
                                    <Divider />

                                    <Typography variant='h5'>
                                        {initialData[0]?.goalWeight}{' '}
                                        {userContext.isEuropeanUnitMeasure
                                            ? ' kg'
                                            : ' lbs'}
                                    </Typography>
                                    <Typography variant='body1'>
                                        {leftToGoal}{' '}
                                        {userContext.isEuropeanUnitMeasure
                                            ? 'kg'
                                            : 'lbs'}
                                        <br />
                                        left to reach your weight goal!
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container marginTop={4} justifyContent={'center'}>
                    <Grid item xs={8}>
                        <Card elevation={12}>
                            <CardContent>
                                <canvas
                                    id='owtChart'
                                    width='400'
                                    height='400'
                                ></canvas>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
