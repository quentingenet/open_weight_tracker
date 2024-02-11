import { Grid } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'My Weights',
        },
    },
};

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function ChartWeights(props: any) {
    const { weightsData } = props;

    const data = {
        labels,
        datasets: [
            {
                label: 'Weight',
                data: weightsData.map((weight: any) => weight.weightValue),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'BMI',
                data: weightsData.map((weight: any) => weight.bmi),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <>
            <Grid
                container
                width={{ xs: '300px', lg: '800px' }}
                height={{ xs: '500px', lg: '600px' }}
                padding={'10px'}
            >
                <Line
                    style={{ backgroundColor: 'white', borderRadius: '10px' }}
                    options={options}
                    data={data}
                />
            </Grid>
        </>
    );
}
