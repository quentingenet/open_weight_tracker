import { Grid } from "@mui/material";

const TitleOwt = (props: { title: string }) => {
    return (
        <Grid container justifyContent={'center'}>
            <Grid
                item
                xs={12}
                marginTop={{ xs: 7, lg: 8 }}
            >
                <h1>{props.title}</h1>
            </Grid>
        </Grid>
    );
}

export default TitleOwt;