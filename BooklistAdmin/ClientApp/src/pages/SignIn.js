import React, { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
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

    const [formState, setFormState] = useState({ submitted: false, hasError: false, siginInputs: { username: '', password: '' }});

    const handleSubmit = async () => {
        const { siginInputs } = formState
        
        const isAuth = await getAuth(`${siginInputs.username}:${siginInputs.password}`)

        if (isAuth.authenticated) {
            setFormState({ ...formState, submitted: true })
            localStorage.setItem('JWT', isAuth.authenticateToken);
            setGobalValue('userData', isAuth)
            setGobalValue('isAuth', isAuth.authenticated)
        } else {
            setFormState({ ...formState, hasError: true, submitted: true})
            console.log(`isAuth ${isAuth.authenticated}`, 'error here')
        }

    }
    const handleChange = (e, name) => {
        setFormState({ ...formState,siginInputs: { ...formState.siginInputs, [name]: e.target.value } })
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
                <FormControl fullWidth noValidate autoComplete="off">
                    <TextField autoFocus
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={formState.siginInputs.username}
                        variant="outlined"
                        onChange={e => handleChange(e, 'username')}
                        error={formState.hasError}
                    />
                    <TextField fullWidth
                        required
                        value={formState.siginInputs.password}
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={e => handleChange(e, 'password')}
                        error={formState.hasError}
                    />
                    {
                        formState.hasError ?
                        < FormHelperText error>
                            Username or password are incorrect
                        </FormHelperText>
                        : null
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={false}
                        fullWidth
                        onClick={() => { handleSubmit() }}
                    >
                        Sign in
                    </Button>
                </FormControl>
                
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SigIn