import React, { Fragment, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table2 from '../components/Table2'
import getDisplays from '../api/getDisplays'
import { Ctx } from '../Context'


const Displays = () => {

    const { setGobalValue, state } = useContext(Ctx)

    useEffect(() => {
        const fetchdisplayList = async () => {
            const resposne = await getDisplays()
            setGobalValue('displays',resposne)
        }
        fetchdisplayList()
    }, [])
    return (
        <Fragment>
            
            <Grid item xs={12}>
                <Paper>
                    {
                        !state.displays ?
                        null
                            : <Table2 rows={state.displays} />
                    }
                </Paper>
            </Grid>
        </Fragment>
    )
}

export default Displays