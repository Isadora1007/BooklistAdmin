import React, { useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const SimpleSelect = () => {
    const [branch, setBranch] = React.useState('')
    const [branchList, setBranchList] = React.useState({ ListOfItems: [{ Name: 'None', Code:'none' } ]})
    const inputLabel = React.useRef(null)
    const [labelWidth, setLabelWidth] = React.useState(0)

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
        const fetchBranchList = async () => {
            const requestData = await fetch('https://reg.calgarylibrary.ca/web-services?sn=Branches')
            const response = await requestData.text()
            setBranchList(JSON.parse(response))
        }
        fetchBranchList()
    }, [])

    const handleChange = event => {
        setBranch(event.target.value)
    }

    return (
        <div>

            <FormControl variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Select a branch
        </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={branch}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                >
                    {
                        branchList.ListOfItems.map(b => <MenuItem key={b.Code} value={b.Code}>{b.Name}</MenuItem>)
                    }
                    
                </Select>
            </FormControl>
        </div>
    )
}


export default SimpleSelect
