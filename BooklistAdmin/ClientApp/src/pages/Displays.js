import React, { Fragment, useEffect,useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table2 from '../components/Table2'
import getDisplays from '../api/getDisplays'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const Displays = () => {

    const classes = useStyles()
    const [displayList, setdisplayList] = useState([])

    useEffect(() => {
        const fetchdisplayList = async () => {
            const resposne = await getDisplays()
            setdisplayList(resposne)
        }
        fetchdisplayList()
    }, [])
    return (
        <Fragment>
            {/*<Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
            </Grid> */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {/* <Typography variant="h2" gutterBottom>Displays</Typography> */}
                    
                    <Table2 rows={displayList} />
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default Displays