import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '50%', sm: '40%', md: '40%', lg: '30%' },
    backgroundImage:
        'linear-gradient(to top, #1e4164, #1b4e7e, #185b9a, #1669b5, #1976d2)',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
};

export default function DisplayWeightModal(props: any) {
    const { weightData, setOpenDisplayWeightModal, openDisplayWeightModal } =
        props;

    const handleCloseDisplayWeightModal = () =>
        setOpenDisplayWeightModal(false);

    return (
        <div>
            <Modal
                open={openDisplayWeightModal}
                onClose={handleCloseDisplayWeightModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        fontFamily={'Khand'}
                    >
                        <strong>
                            {dayjs(weightData.date).format(
                                'DD/MM/YYYY hh:mm A'
                            )}
                        </strong>
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>Weight:</strong> {weightData.weightValue} kg
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>Muscular mass:</strong>{' '}
                        {weightData.muscularMass} %
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>Fat mass:</strong> {weightData.fatMass} %
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>Bone mass:</strong> {weightData.boneMass} %
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>Water mass:</strong> {weightData.waterMass} %
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        fontFamily={'Khand'}
                    >
                        <strong>BMI:</strong> {weightData.bmi}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
