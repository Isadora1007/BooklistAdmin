import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Ctx } from '../Context'

const UserName = () => {
    const { state } = useContext(Ctx)
    const displayName = state.userData.displayName || ''
    return (
        <Typography variant="h6" noWrap>
            {displayName}
        </Typography>
    )
}

export default UserName;