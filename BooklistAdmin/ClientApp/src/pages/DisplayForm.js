import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import getDisplays from '../api/getDisplays'
import BranchSelect from '../components/Select'
import { Ctx } from '../Context'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}))

const DisplayForm = (props) => {
    const { state, setGobalValue } = useContext(Ctx)
    const displayId = !state.rowsSelected ? '' : state.rowsSelected 
    const classes = useStyles()
    let history = useHistory()

    const [formState, setFormState] = useState({
        formInputs: {
            displayId: 0,
            layoutId: 0,
            booklistId: 0,
            name: '',
            branch: '',
            booklist: null,
            layout: null
        }
    })

    useEffect(() => {
        const fetchBookLists = async () => {
            const resposne = await getDisplays(displayId)
            setFormState({ ...formState, formInputs: resposne })
        }
        if (state.editMode) {
            fetchBookLists()
        }
    }, [])

    const handleChange = (e, name) => {
        setFormState({ formInputs: { ...formState.formInputs, [name]: e.target.value } })
    }
    const handleSwitchChange = (e, name) => {
        setFormState({ formInputs: { ...formState.formInputs, [name]: e.target.checked } })
    }

    const submitForm = () => {
        const { formInputs } = formState
        //if (state.editMode) {
        //    //editBookList(displayId, JSON.stringify(formInputs))
        //    setGobalValue('editMode', false)
        //    setGobalValue('sanckbarMsg', `${formInputs.title} was edited`)
        //    setGobalValue('isSanckbarOpen', true)
        //} else {
        //    SetNewBookList(formInputs)
        //    setGobalValue('sanckbarMsg', `${formInputs.title} was created`)
        //    setGobalValue('isSanckbarOpen', true)
        //}
        history.goBack()
    }

    const handleCancel = () => {
        setGobalValue('editMode', false)
        history.goBack()
    }

    //CTA stands for call to action
    let cta = state.editMode ? 'Save edits' : 'Create'

    return (
        <Fragment>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>Display settings</Typography>
                    <form noValidate autoComplete="off">
                        <TextField autoFocus
                            required
                            fullWidth
                            margin="normal"
                            label="Display name"
                            value={formState.formInputs.name}
                            variant="outlined"
                            onChange={e => handleChange(e, 'name')}
                        />
                        <BranchSelect/>
                        <BranchSelect />
                        
                    </form>
                    <Button variant="contained" color="primary" disabled={false} onClick={() => { submitForm() }}>
                        {cta}
                    </Button>
                    <Button variant="contained" onClick={() => { handleCancel() }}>
                        Cancel
                    </Button>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default DisplayForm