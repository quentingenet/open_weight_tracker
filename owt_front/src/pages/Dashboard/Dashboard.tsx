import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Grid, Link, Tooltip } from '@mui/material';
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
import { ChartWeights } from '../../components/Charts/ChartWeights';
import ChartSingleWeight from '../../components/Charts/ChartSingleWeight';
import './Dashboard.css';
export default function Dashboard() {
    ChartJS.register(ArcElement, ToolTipChartJS, Legend);
    const userContext = useUserContext();
    const [initialData, setInitialData] = useState<IInitialData[]>([]);
    const [weightsData, setWeightsData] = useState<IWeight[]>([]);
    const [displayGlobalChartWeights, setDisplayGlobalChartWeights] =
        useState<boolean>(true);
    const [displayChartSingleWeight, setDisplayChartSingleWeight] =
        useState<boolean>(false);
    const lastWeight = weightsData[weightsData.length - 1];

    const handleChangeChart = () => {
        setDisplayGlobalChartWeights(!displayGlobalChartWeights);
        setDisplayChartSingleWeight(!displayChartSingleWeight);
    };
    const fetchWeights = async () => {
        try {
            await getWeights().then((res) => {
                const transformedData = res.map((weight: any) => ({
                    weightValue: weight.weight_value,
                    muscularMass: weight.muscular_mass,
                    boneMass: weight.bone_mass,
                    waterMass: weight.body_water,
                    date: weight.weight_record_date,
                    bmi: weight.bmi,
                }));

                return setWeightsData(transformedData);
            });
        } catch (error) {
            console.error('Failed to fetch weights:', error);
        }
    };

    const fetchInitialData = async () => {
        try {
            await getInitialData().then((res) => {
                const transformedInitialData = res.map((initialData: any) => ({
                    goalWeight: initialData.goal_weight,
                    initialWeight: initialData.initial_weight,
                    height: initialData.height,
                    age: initialData.age,
                }));
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
            {weightsData.length >= 1 &&
            initialData !== null &&
            !userContext.isFirstConnection ? (
                <Grid container marginTop={{ xs: 1, lg: 2 }}>
                    <Grid item xs={12} justifyContent={'center'}>
                        <h1>Dashboard</h1>
                    </Grid>
                    <Grid
                        container
                        marginTop={1}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={{ xs: 'column', lg: 'row' }}
                        gap={2}
                    >
                        <Grid
                            item
                            xs={6}
                            lg={3}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Tooltip title='Check my weight stats'>
                                <Card
                                    onClick={handleChangeChart}
                                    elevation={12}
                                    sx={{
                                        cursor: 'pointer',
                                        width: { xs: '200px', lg: '100%' },
                                        height: { xs: 200, lg: 170 },
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

                        <Grid
                            item
                            xs={6}
                            lg={3}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Tooltip title='Check my initial data'>
                                <Card
                                    elevation={12}
                                    sx={{
                                        cursor: 'pointer',
                                        width: { xs: '200px', lg: '100%' },
                                        height: { xs: 200, lg: 170 },
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
                                            left to reach
                                            <br /> your weight goal!
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        marginTop={{ xs: 1, lg: 3 }}
                    >
                        <Grid item xs={12} className='dashboard'>
                            {displayGlobalChartWeights ? (
                                <ChartWeights weightsData={weightsData} />
                            ) : displayChartSingleWeight ? (
                                <ChartSingleWeight
                                    singleWeightData={lastWeight}
                                />
                            ) : (
                                <ChartWeights weightsData={weightsData} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <>
                    {' '}
                    <Grid container marginTop={{ xs: 3, lg: 3 }}>
                        <Grid item xs={12} justifyContent={'center'}>
                            <h1>
                                Please enter some weights to display your
                                dashboard...
                            </h1>
                            <Link> </Link>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
