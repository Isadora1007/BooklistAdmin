import React, { Fragment, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TableBooklistLayout from '../components/TableBooklistLayout'
import getBookListLayout from '../api/getBookListLayout'
import { Ctx } from '../Context'


const BookListLayOut = () => {
    const { setGobalValue, state } = useContext(Ctx)

    useEffect(() => {
        const fetchBookListsLayout = async () => {
            const resposne = await getBookListLayout()
            setGobalValue('booklistLayout', resposne)
        }
        fetchBookListsLayout()
    }, [])

    return (
        <Fragment>

            <Grid item xs={12}>
                {/*<Typography variant='h5' color='textPrimary' gutterBottom>Book list layout</Typography>*/}
                <Paper>
                    {
                        !state.booklistLayout ?
                            null
                            : <TableBooklistLayout rows={state.booklistLayout} />
                    }
                </Paper>
            </Grid>
        </Fragment>
    )
}

export default BookListLayOut