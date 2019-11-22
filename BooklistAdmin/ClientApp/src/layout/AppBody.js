import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Switch,Route } from "react-router-dom";
import BookList from '../pages/BookList'
import BookListLayout from '../pages/BookListLayout'
import Collections from '../pages/Collections'
import Displays from '../pages/Displays'
import SignIn from '../pages/SignIn'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));

const BodyGrid = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Switch>
                    <Route exact path='/book-list' component={BookList} />
                    <Route exact path='/book-list-layout' component={BookListLayout} />
                    <Route exact path='/collections' component={Collections} />
                    <Route path='/displays' component={Displays} />
                    <Route path='/sign-in' component={SignIn} />
                </Switch>
            </Grid>
        </div>
    );
}

export default BodyGrid