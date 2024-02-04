import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Tooltip } from '@mui/material';

export default function Dashboard() {
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
                    gap={1}
                >
                    <Grid item xs={3}>
                        <Tooltip title='Check my weight stats'>
                            <Card
                                elevation={12}
                                sx={{
                                    minWidth: 200,
                                    maxWidth: 250,
                                    height: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom
                                    >
                                        Last weight
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                    ></Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color='text.secondary'
                                    >
                                        DATE
                                    </Typography>
                                    <Typography variant='body2'>
                                        WEIGHT
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                        <Tooltip title='Check my BMI stats'>
                            <Card
                                elevation={12}
                                sx={{
                                    minWidth: 200,
                                    maxWidth: 250,
                                    height: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom
                                    >
                                        Last BMI
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                    ></Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color='text.secondary'
                                    >
                                        DATE
                                    </Typography>
                                    <Typography variant='body2'>BMI</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                        <Tooltip title='Check my goal and inital datas'>
                            <Card
                                elevation={12}
                                sx={{
                                    minWidth: 200,
                                    maxWidth: 250,
                                    height: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom
                                    >
                                        MY GOAL
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                    ></Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color='text.secondary'
                                    >
                                        Objective : WEIGHT
                                    </Typography>
                                    <Typography color='text.secondary'>
                                        Current weight : last weight
                                    </Typography>
                                    <Typography variant='body2'></Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
