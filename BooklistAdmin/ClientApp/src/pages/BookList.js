import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '../components/Table'
import getBookList from '../api/getBookList'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const BookList = () => {

    const classes = useStyles()
    const [bookLists, setBookLists] = useState([])

    useEffect(() => {
        const fetchBookLists = async () => {
            const resposne = await getBookList()
            setBookLists(resposne)
        }
        fetchBookLists()
    }, [])
    return (
        <Fragment>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Table rows={bookLists}/>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default BookList