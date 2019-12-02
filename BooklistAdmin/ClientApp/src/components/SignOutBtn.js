import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

const SignOutBtn = () => {


    return (
        <Button
            variant="contained"
            color="primary"
            disabled={false}
            component={Link} to='sign-in'>
            Sign-out
        </Button>
    )
}

export default SignOutBtn