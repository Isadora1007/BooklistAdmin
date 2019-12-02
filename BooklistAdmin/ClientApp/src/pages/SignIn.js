import React, { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import getAuth from '../api/getAuth'
import { Ctx } from '../Context'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const SigIn = () => {
    const classes = useStyles()
    const { setGobalValue } = useContext(Ctx)

    const [formState, setFormState] = useState({ submitted: false, siginInputs: { username: '', password: '' } });

    const handleSubmit = async(s) => {
        const { siginInputs } = s
        const isAuth = await getAuth(`${siginInputs.username}:${siginInputs.password}`)

        if (isAuth.authenticated) {
            localStorage.setItem('JWT', isAuth.authenticateToken);
            setGobalValue('userData', isAuth)
            setGobalValue('isAuth', isAuth.authenticated)
        } else {
            console.log(`isAuth ${isAuth.authenticated}`, 'error here')
            //throw error
        }

    }
    const handleChange = (e, name) => {
        setFormState({ siginInputs: { ...formState.siginInputs, [name]: e.target.value } })
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ height: 'calc(100vh - 88px)' }}
        >
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>Please sign-in</Typography>
                <form noValidate autoComplete="off">
                    <TextField autoFocus
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={formState.siginInputs.username}
                        variant="outlined"
                        onChange={e => handleChange(e, 'username')}
                    />
                    <TextField fullWidth
                        required
                        value={formState.siginInputs.password}
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={e => handleChange(e, 'password')}
                    />
                </form>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={false}
                        fullWidth
                        onClick={() => { handleSubmit(formState) }}>
                    Sign in
                </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default SigIn