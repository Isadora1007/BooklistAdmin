import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Switch, Route } from "react-router-dom";
import BookList from '../pages/BookList'
import PrivateRoute from '../components/PrivateRoute'
import BookListLayout from '../pages/BookListLayout'
import Collections from '../pages/Collections'
import Displays from '../pages/Displays'
import SignIn from '../pages/SignIn'
import BookListForm from '../pages/BookListForm'
import PageNotFound from '../pages/PageNotFound'


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
                    <PrivateRoute exact path='/' component={BookList} />
                    <PrivateRoute exact path='/new-book-list' component={BookListForm} />
                    <PrivateRoute exact path='/book-list-layout' component={BookListLayout} />
                    <PrivateRoute exact path='/collections' component={Collections} />
                    <PrivateRoute exact path='/displays' component={Displays} />
                    <Route exact path='/sign-in' component={SignIn} /><Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
}

export default BodyGrid