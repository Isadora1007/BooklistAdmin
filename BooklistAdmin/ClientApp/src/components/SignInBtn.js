import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

const SignInBtn = () => {

    return (
        <Button
            variant="contained"
            color="primary"
            //disabled={false}
            component={Link} to='sign-in'>
            Sign-in
        </Button>
    )
}

export default SignInBtn