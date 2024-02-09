import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
    const navigate = useNavigate();
    return (
        <>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                xs={12}
            >
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{ color: 'white', textAlign: 'center' }}
                >
                    <strong>
                        Terms of Use for the Open Weight Tracker Application
                    </strong>
                </Typography>
                </Grid>
                <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                xs={12}
            >
                <Grid item mt={2} color={"white"}>
                <Typography>
                    <strong>
                        The Open Weight Tracker Application is a free and
                        open-source application under copyleft, developed by
                        Quentin Genet. The purpose of the Application is to
                        provide a tool for tracking weight and body
                        measurements.
                        <br /> The Application is available on the website
                        https://owt.quentingenet.fr
                    </strong>
              
                        <br />
                    
                            <strong>
                                <center>Legal information</center>
                            </strong>
                            <br />
                            Website owner, administrator, and webmaster contact:
                            Quentin Genet, Website hosting: OVH - SAS with a
                            capital of €10,069,020 RCS Lille Métropole 424 761
                            419 00045Code APE 2620ZN° TVA: FR 22 424 761
                            419Registered office: 2 rue Kellermann - 59100
                            Roubaix - France
                   
                        <br />
                     
                            <strong>1. Acceptance of Terms of Use</strong>
                            <br />
                        1.1. The use of the Open Weight Tracker application
                        (hereinafter referred to as the "Application") is
                        subject to the unconditional acceptance of these Terms
                        of Use (hereinafter referred to as "Terms").
                        <br />
                        1.2. The user acknowledges having read the Terms
                        carefully and agrees to comply with all the provisions
                        stated herein.
                        <br />
                   
                            <strong>2. Personal Use</strong>
                            <br />
                        2.1. The Open Weight Tracker Application is designed
                        solely for personal purposes of information and weight
                        tracking. The user is informed that the information
                        provided by the Application should not replace the
                        advice of a healthcare professional.
                        <br />
                        2.2. The user is encouraged to consult a healthcare
                        professional before making any significant changes to
                        their diet or lifestyle based on the information
                        provided by the Application.
                        <br />
                    
                            <strong>3. User Responsibility</strong>
                            <br />
                        3.1. The user is entirely responsible for their
                        decisions, dietary choices, and actions resulting from
                        the use of the Open Weight Tracker Application.
                        <br />
                        3.2. The creators of the Application disclaim any
                        responsibility for the consequences resulting from the
                        actions taken by the user based on the information
                        provided by the Application.
                        <br />
                  
                            <strong>4. No Warranty</strong>
                            <br />
                        4.1. The Open Weight Tracker Application is provided "as
                        is" without warranty of accuracy, reliability, or
                        fitness for a particular purpose.
                        <br />
                        4.2. The creators of the Application do not guarantee
                        the results obtained from the use of the Application and
                        cannot be held responsible for errors, inaccuracies, or
                        omissions in the information provided.
                        <br />
                            <strong>
                                5. Non-Disclosure of User Data for Advertising
                                or Marketing Purposes
                            </strong>
                            <br />
                        5.1. The creators of the Open Weight Tracker Application
                        commit to not disclosing user data to third parties for
                        advertising or marketing purposes.
                        <br />
                        5.2. No personal information of the user will be sold,
                        rented, or shared with third parties for commercial
                        prospecting without the explicit consent of the user.
                        <br />{' '}
                
                            <strong>6. Service Interruption</strong>
                            <br />
                        6.1. The user acknowledges that the Application may
                        experience temporary interruptions for technical,
                        maintenance, or other reasons, and the creators of the
                        Application are not responsible for disruptions in use.{' '}
                        <br />
                   
                            <strong>7. Collection and Use of Data</strong>
                            <br />
                        7.1. The user consents to the collection, storage, and
                        use of their data in accordance with the privacy policy
                        of the Open Weight Tracker Application, accessible on
                        the Application's website. No user data is transferred
                        to a third party or for marketing or analysis purposes.
                        <br />
                    
                            <strong>8. Modification of Terms of Use</strong>
                            <br />
                        8.1. The creators of the Open Weight Tracker Application
                        reserve the right to modify the Terms at any time. It is
                        the user's responsibility to regularly check for
                        updates.
                        <br />
                            <strong>9. Applicable Law and Jurisdiction</strong>
                            <br />
                        9.1. These Terms are governed by French law. Any dispute
                        arising from the use of the Application falls under the
                        exclusive jurisdiction of French courts.
                    
                </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} marginY={2}>
                <Button variant='contained' onClick={() => navigate('/')}>BACK TO LOGIN</Button>
            </Grid>
        </>
    );
}
