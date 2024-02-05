import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { Pie } from 'react-chartjs-2';
import { useUserContext } from '../../contexts/UserContext';
import { Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartSingleWeight(props: any) {
    const { singleWeightData } = props;
    const userContext = useUserContext();
    const dataToDisplay = [
        singleWeightData.muscularMass,
        singleWeightData.waterMass,
        singleWeightData.boneMass,
    ];
    const data = {
        labels: ['Muscular Mass', 'Body water', 'Bone mass'],
        datasets: [
            {
                label: '%',
                data: dataToDisplay,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Last weight ${dayjs(singleWeightData.date).format(
                    'DD-MM-YYYY'
                )}: ${singleWeightData.weightValue} ${
                    userContext.isEuropeanUnitMeasure ? 'Kg' : 'Lbs'
                }`,
            },
        },
    };
    return (
        <>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <Pie data={data} options={options} />
            </div>
        </>
    );
}
