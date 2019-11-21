import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const BookListLayOut = () => {
    const classes = useStyles()
    return (
        <Fragment>
            <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>Book list layoy</Typography>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default BookListLayOut