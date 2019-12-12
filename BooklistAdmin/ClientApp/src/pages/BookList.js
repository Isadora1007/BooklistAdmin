import React, { Fragment, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '../components/Table'
import getBookList from '../api/getBookList'
import { Ctx } from '../Context'

const BookList = () => {

    const { setGobalValue, state } = useContext(Ctx)

    useEffect(() => {
        const fetchBookLists = async () => {
            const resposne = await getBookList()
            setGobalValue('bookLists', resposne)
        }
        fetchBookLists()
    }, [])

    return (
        <Fragment>

            <Grid item xs={12}>
                <Paper>
                    {
                        !state.bookLists ?
                        null
                        : <Table rows={state.bookLists} />
                    }
                </Paper>
            </Grid>
        </Fragment>
    )
}

export default BookList