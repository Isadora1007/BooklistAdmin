import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SetNewBookList from '../api/SetNewBookList'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const NewBookList = () => {
    const [formState, setFormState] = useState({ formInputs: { title: '', owner: '', description: '', bibliocommonslisturl:'' } });
    const classes = useStyles()
    let history = useHistory()

    const submitForm = (s) => {

        const { formInputs } = s

        SetNewBookList(formInputs)
        history.goBack()
    }
    const handleChange = (e, name) => {
      setFormState({ formInputs: { ...formState.formInputs, [name]: e.target.value } })
    }

    return (
        <Fragment>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" gutterBottom>New book list</Typography>
                    <form noValidate autoComplete="off">
                        <TextField autoFocus
                            required
                            fullWidth
                            margin="normal"
                            label="URL list"
                            value={formState.formInputs.bibliocommonslisturl}
                            variant="outlined"
                            onChange={e => handleChange(e, 'bibliocommonslisturl')}
                        />
                        <TextField fullWidth
                            value={formState.formInputs.title}
                            margin="normal"
                            label="Title"
                            variant="outlined"
                            onChange={e => handleChange(e, 'title')}
                        />
                        <TextField fullWidth
                            label="Description"
                            value={formState.formInputs.description}
                            multiline
                            rows="8"
                            margin="normal"
                            variant="outlined"
                            onChange={e => handleChange(e, 'description')}
                        />
                        <TextField
                            fullWidth
                            value={formState.formInputs.owner}
                            margin="normal"
                            label="Owner"
                            variant="outlined"
                            onChange={e => handleChange(e, 'owner')}
                        />
                    </form>
                    <Button variant="contained" color="primary" disabled={false} onClick={() => { submitForm(formState)}}>
                        Create book list
                    </Button>
                    <Button variant="contained" onClick={() => { history.goBack() }}>
                        Cancel
                    </Button>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default NewBookList