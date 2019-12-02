import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Ctx } from '../Context'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(Ctx)
    return (
        <Route
            {...rest}
            render={props =>
                state.isAuth ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/sign-in" />
                    )
            }
        />
    );
}

export default PrivateRoute