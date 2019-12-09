import React, { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import { Ctx } from '../Context'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'


const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}))

const SnackBar = () => {
    const { state, setGobalValue } = useContext(Ctx)
    const handleClose = () => {
        setGobalValue('sanckbarMsg', '')
        setGobalValue('isSanckbarOpen', false)
    }
    const classes = useStyles()
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={state.isSanckbarOpen}
            autoHideDuration={6000}
            message={state.sanckbarMsg}
            onClose={() => handleClose()}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => handleClose()}
                >
                    <CloseIcon />
                </IconButton>
            ]}
        />
            
    )
}

export default SnackBar