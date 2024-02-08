import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ModalOwt(props: any) {
    const { openTermsModal, setOpenTermsModal } = props;

    const handleClose = () => setOpenTermsModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflowY: 'scroll',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '90%',
            sm: '60%',
            md: '50%',
            lg: '40%',
            xl: '30%',
        },
        maxHeight: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    return (
        <>
            <Modal
                open={openTermsModal}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        variant='h6'
                        component='h2'
                        sx={{
                            color: 'black',
                            textAlign: 'center',
                        }}
                    >
                        Terms of Use for the Open Weight Tracker Application
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2, color: 'black' }}
                    >
                        <strong>
                            The Open Weight Tracker Application is a free and
                            open-source application under copyleft, developed by
                            Quentin Genet. The purpose of the Application is to
                            provide a tool for tracking weight and body
                            measurements.
                            <br /> The Application is available on the website
                            https://owt.quentingenet.fr
                        </strong>
                        <ul
                            style={{
                                listStyleType: 'none',
                            }}
                        >
                            <br />
                            <li>
                                <strong>
                                    <center>Legal information</center>
                                </strong>
                                <br />
                                Website owner, administrator, and webmaster
                                contact: Quentin Genet, Website hosting: OVH -
                                SAS with a capital of €10,069,020 RCS Lille
                                Métropole 424 761 419 00045Code APE 2620ZN° TVA:
                                FR 22 424 761 419Registered office: 2 rue
                                Kellermann - 59100 Roubaix - France
                            </li>
                            <br />
                            <li>
                                <strong>1. Acceptance of Terms of Use</strong>
                            </li>
                            1.1. The use of the Open Weight Tracker application
                            (hereinafter referred to as the "Application") is
                            subject to the unconditional acceptance of these
                            Terms of Use (hereinafter referred to as "Terms").
                            <br />
                            1.2. The user acknowledges having read the Terms
                            carefully and agrees to comply with all the
                            provisions stated herein.
                            <br />
                            <li>
                                <strong>2. Personal Use</strong>
                            </li>
                            2.1. The Open Weight Tracker Application is designed
                            solely for personal purposes of information and
                            weight tracking. The user is informed that the
                            information provided by the Application should not
                            replace the advice of a healthcare professional.
                            <br />
                            2.2. The user is encouraged to consult a healthcare
                            professional before making any significant changes
                            to their diet or lifestyle based on the information
                            provided by the Application.
                            <br />
                            <li>
                                <strong>3. User Responsibility</strong>
                            </li>
                            3.1. The user is entirely responsible for their
                            decisions, dietary choices, and actions resulting
                            from the use of the Open Weight Tracker Application.
                            <br />
                            3.2. The creators of the Application disclaim any
                            responsibility for the consequences resulting from
                            the actions taken by the user based on the
                            information provided by the Application.
                            <br />
                            <li>
                                <strong>4. No Warranty</strong>
                            </li>
                            4.1. The Open Weight Tracker Application is provided
                            "as is" without warranty of accuracy, reliability,
                            or fitness for a particular purpose.
                            <br />
                            4.2. The creators of the Application do not
                            guarantee the results obtained from the use of the
                            Application and cannot be held responsible for
                            errors, inaccuracies, or omissions in the
                            information provided.
                            <li>
                                <strong>
                                    5. Non-Disclosure of User Data for
                                    Advertising or Marketing Purposes
                                </strong>
                            </li>
                            5.1. The creators of the Open Weight Tracker
                            Application commit to not disclosing user data to
                            third parties for advertising or marketing purposes.
                            <br />
                            5.2. No personal information of the user will be
                            sold, rented, or shared with third parties for
                            commercial prospecting without the explicit consent
                            of the user.
                            <br />{' '}
                            <li>
                                <strong>6. Service Interruption</strong>
                            </li>
                            6.1. The user acknowledges that the Application may
                            experience temporary interruptions for technical,
                            maintenance, or other reasons, and the creators of
                            the Application are not responsible for disruptions
                            in use. <br />
                            <li>
                                <strong>7. Collection and Use of Data</strong>
                            </li>
                            7.1. The user consents to the collection, storage,
                            and use of their data in accordance with the privacy
                            policy of the Open Weight Tracker Application,
                            accessible on the Application's website. No user
                            data is transferred to a third party or for
                            marketing or analysis purposes.
                            <br />
                            <li>
                                <strong>8. Modification of Terms of Use</strong>
                            </li>
                            8.1. The creators of the Open Weight Tracker
                            Application reserve the right to modify the Terms at
                            any time. It is the user's responsibility to
                            regularly check for updates.
                            <li>
                                <strong>
                                    9. Applicable Law and Jurisdiction
                                </strong>
                            </li>
                            9.1. These Terms are governed by French law. Any
                            dispute arising from the use of the Application
                            falls under the exclusive jurisdiction of French
                            courts.
                        </ul>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
