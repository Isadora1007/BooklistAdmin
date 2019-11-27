import React from 'react';
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

const SignIn = () => {
    const Auth = async () => {
        console.log('Auth')
    }

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={false}
            onClick={() => { Auth() }}
            component={Link} to='sign-in'>
            Sign-in
        </Button>
    )
}

export default SignIn;