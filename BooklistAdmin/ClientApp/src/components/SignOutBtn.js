import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Ctx } from '../Context'

const SignOutBtn = () => {
    const celarUserData = {
        authenticateToken: null,
        authenticated: false,
        displayName: "",
        message: null,
        password: null,
        userName: "", 
    }
    const { setGobalValue } = useContext(Ctx)
    const signOut = () => {
        localStorage.clear()
        setGobalValue('userData', celarUserData)
        setGobalValue('isAuth', false)
    }

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={false}
            onClick={() => signOut()}
            component={Link} to='sign-in'>
            Sign-out
        </Button>
    )
}

export default SignOutBtn