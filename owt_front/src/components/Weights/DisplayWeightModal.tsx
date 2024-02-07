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
    width: { xs: '80%', sm: '70%', md: '40%', lg: '30%'},
    bgcolor: '#384454',
    border: '2px solid #000',
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
                    >
                        <strong>
                            {dayjs(weightData.date).format(
                                'DD/MM/YYYY hh:mm A'
                            )}
                        </strong>
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>Weight:</strong> {weightData.weightValue} kg
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>Muscular mass:</strong>{' '}
                        {weightData.muscularMass} %
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>Fat mass:</strong> {weightData.fatMass} %
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>Bone mass:</strong> {weightData.boneMass} %
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>Water mass:</strong> {weightData.waterMass} %
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <strong>BMI:</strong> {weightData.bmi}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
