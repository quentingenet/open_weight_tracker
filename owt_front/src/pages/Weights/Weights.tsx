import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useUserContext } from '../../contexts/UserContext';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import AddWeightModal from '../../components/Weights/AddWeightModal';
import { useEffect, useState } from 'react';
import {
    deleteWeight as deleteWeightService,
    getWeights as getWeightsService,
} from '../../services/WeightService';
import { IWeight } from '../../models/IWeight';
import dayjs from 'dayjs';
import DisplayWeightModal from '../../components/Weights/DisplayWeightModal';

export default function Weights() {
    const userContext = useUserContext();
    const [open, setOpen] = useState<boolean>(false);
    const [newWeightAdded, setNewWeightAdded] = useState<boolean>(false);
    const [weightDeleted, setWeightDeleted] = useState<boolean>(false);
    const [weights, setWeights] = useState<IWeight[]>([]);
    const [openDisplayWeightModal, setOpenDisplayWeightModal] = useState(false);
    const [weightToDisplay, setWeightToDisplay] = useState<IWeight>(
        {} as IWeight
    );
    const deleteWeight = async (weightId: number) => {
        try {
            await deleteWeightService(weightId);
            setWeightDeleted(true);
        } catch (error) {
            console.error('Error deleting weight:', error);
        }
    };

    const displayWeight = (weight: IWeight) => {
        setWeightToDisplay(weight);
    };

    useEffect(() => {
        getWeightsService().then((response) => {
            setWeights(
                response.map((w: any) => ({
                    id: w.id,
                    date: w.weight_record_date,
                    weightValue: w.weight_value,
                    muscularMass: w.muscular_mass,
                    fatMass: w.fat_mass,
                    boneMass: w.bone_mass,
                    waterMass: w.body_water,
                    bmi: w.bmi,
                }))
            );
            setNewWeightAdded(false);
            setWeightDeleted(false);
        });
    }, [newWeightAdded, weightDeleted]);

    return (
        <>
            <DisplayWeightModal
                weightData={weightToDisplay}
                openDisplayWeightModal={openDisplayWeightModal}
                setOpenDisplayWeightModal={setOpenDisplayWeightModal}
            />
            <Grid
                container
                marginTop={6}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                {open && (
                    <AddWeightModal
                        open={open}
                        setOpen={setOpen}
                        newWeightAdded={newWeightAdded}
                        setNewWeightAdded={setNewWeightAdded}
                    />
                )}
                <Typography variant='h2'>My weights</Typography>
            </Grid>
            <Grid container justifyContent={'center'}>
                <Grid
                    item
                    marginY={5}
                    xs={12}
                    md={4}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <TableContainer
                        component={Paper}
                        sx={{ overflowX: 'hidden' }}
                    >
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' width='1%'>
                                        <Tooltip title='Add new weight'>
                                            <IconButton
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                            >
                                                <AddCircleOutlineOutlined
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        width='1%'
                                    ></TableCell>
                                    <TableCell align='center' width='3%'>
                                        <span style={{ fontWeight: 'bold' }}>
                                            Date
                                        </span>
                                    </TableCell>
                                    <TableCell align='center' width='3%'>
                                        <span style={{ fontWeight: 'bold' }}>
                                            {userContext.isEuropeanUnitMeasure
                                                ? 'Kg'
                                                : 'Lbs'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weights.map((weight) => (
                                    <TableRow
                                        key={weight.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell align='center'>
                                            <Tooltip title='Check weight'>
                                                <IconButton
                                                    onClick={() => {
                                                        displayWeight(weight);
                                                        setOpenDisplayWeightModal(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <RemoveRedEyeIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Tooltip title='Delete'>
                                                <IconButton
                                                    onClick={() => {
                                                        deleteWeight(
                                                            Number(weight.id)
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align='center'>
                                            {weight.date &&
                                                dayjs(weight.date).format(
                                                    'DD-MM-YYYY hh:mm A'
                                                )}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {weight.weightValue}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}
