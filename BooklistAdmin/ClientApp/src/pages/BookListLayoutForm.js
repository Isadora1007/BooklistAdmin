import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SetNewBookList from '../api/SetNewBookList'
import getBookListLayout from '../api/getBookListLayout'
import editBookList from '../api/editBookList'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Ctx } from '../Context'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}))

const BookListForm = (props) => {
    const layoutId = !props.location.state.layoutId ? '' : props.location.state.layoutId
    const { state, setGobalValue } = useContext(Ctx)
    const classes = useStyles()
    let history = useHistory()

    const [formState, setFormState] = useState({
        formInputs: {
            layoutId: 0,
            name:'',
            collectionTypeId: 0,
            description: '',
            showHolds: false,
            booksPerPage: 0,
            booksPerRow: 0,
            showGuide: false,
            styleId: 0,
            autoSlideTimeout: 0,
            width: 0,
            height: 0,
            showHeader: false,
            active: false,
            collectionType: null,
            display: []
        }
    })

    

    useEffect(() => {
        const fetchBookListLayout = async () => {
            const response = await getBookListLayout(layoutId)
            setFormState({ ...formState, formInputs: response })
        }
        if (state.editMode) {
            console.log('fetching')
            fetchBookListLayout()
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
        if (state.editMode) {
            editBookList(layoutId, JSON.stringify(formInputs))
            //setGobalValue('editMode', false)
            //setGobalValue('sanckbarMsg', `${formInputs.title} was edited`)
            //setGobalValue('isSanckbarOpen', true)
        } else {
            SetNewBookList(formInputs)
            //setGobalValue('sanckbarMsg', `${formInputs.title} was created`)
            //setGobalValue('isSanckbarOpen', true)
        }
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
                    <Typography variant="h3" gutterBottom>New book list</Typography>
                    <form noValidate autoComplete="off">
                        <TextField autoFocus
                            required
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={formState.formInputs.name}
                            variant="outlined"
                            onChange={e => handleChange(e, 'name')}
                        />
                        <TextField fullWidth
                            value={formState.formInputs.title}
                            margin="normal"
                            label="Title"
                            variant="outlined"
                            onChange={e => handleChange(e, 'title')}
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.formInputs.active} onChange={e => handleSwitchChange(e, 'active')} value="active" />
                            }
                            label="Active"
                        />
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

export default BookListForm