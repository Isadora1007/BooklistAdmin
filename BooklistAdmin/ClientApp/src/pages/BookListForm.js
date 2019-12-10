import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Branches from '../components/Select'
import Button from '@material-ui/core/Button'
import SetNewBookList from '../api/SetNewBookList'
import getBookList from '../api/getBookList'
import editBookList from '../api/editBookList'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Ctx } from '../Context'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}))

const BookListForm = (props) => {
    const bookListId = !props.location.state.bookListId ? '' : props.location.state.bookListId
    const { state, setGobalValue } = useContext(Ctx)
    const classes = useStyles()
    let history = useHistory()

    //Drop-down states
    const [branchList, setBranchList] = React.useState({ ListOfItems: [{ Name: 'None', Code: 'none' }] })
    const inputLabel = React.useRef(null)
    const [labelWidth, setLabelWidth] = React.useState(0)

    const [formState, setFormState] = useState({
        formInputs: {
            title: '',
            owner: '',
            description: '',
            bibliocommonslisturl: '',
            branch: '',
            active: false
        }
    })

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
        const fetchBookLists = async () => {
            const resposne = await getBookList(bookListId)
            setFormState({ ...formState, formInputs: resposne })
        }
        if (state.editMode) {
            fetchBookLists()
        }
        const fetchBranchList = async () => {
            const requestData = await fetch('https://reg.calgarylibrary.ca/web-services?sn=Branches')
            const response = await requestData.text()
            setBranchList(JSON.parse(response))
        }
        fetchBranchList()
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
            editBookList(bookListId, JSON.stringify(formInputs))
            setGobalValue('editMode', false)
            setGobalValue('sanckbarMsg', `${formInputs.title} was edited`)
            setGobalValue('isSanckbarOpen', true)
        } else {
            SetNewBookList(formInputs)
            setGobalValue('sanckbarMsg', `${formInputs.title} was created`)
            setGobalValue('isSanckbarOpen', true)
        }
        history.goBack()
    }

    const handleCancel = () => {
        setGobalValue('editMode', false)
        history.goBack()
    }

    //CTA stands for call to action
    let cta = state.editMode ? 'Edit book list' : 'Create book list'

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
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                Select a branch
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={formState.formInputs.branch}
                                onChange={e => handleChange(e, 'branch')}
                                labelWidth={labelWidth}
                            >
                                {
                                    branchList.ListOfItems.map(b => <MenuItem key={b.Code} value={b.Code}>{b.Name}</MenuItem>)
                                }

                            </Select>
                        </FormControl>

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