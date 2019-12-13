import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { Ctx } from '../Context'
import deleteBookList from '../api/deleteBookList'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const headCells = [
    { id: 'layoutId', numeric: true, disablePadding: false, label: 'Layout id', },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'active', numeric: false, disablePadding: false, label: 'Playing at branch' },
]

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props
    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={headCell.style}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}

                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        justifyContent: 'space-between'
    },
    
    actions: {
        marginLeft: theme.spacing(1)
    }
}))

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles()
    const { totalRowsSelected, onSelectEdit, onSelectDelete, onSelectAdd, listLenght } = props

    return (
        <Toolbar className={classes.root}>
            <div>
                <Tooltip title="Add new book list">
                    <Fab color="secondary" aria-label="add" size="small" onClick={() => { onSelectAdd() }}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            
                {totalRowsSelected === 1 ?
                    <Fragment>
                        <Tooltip title="Edit selected layout">
                            <IconButton className={classes.actions} onClick={() => { onSelectEdit() }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete selected layout" onClick={() => { onSelectDelete() }}>
                            <IconButton className={classes.actions} >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Fragment>
                     : null
                    }
            </div>
            <Typography variant="body2" color="textSecondary">
                {`${listLenght} book list layouts`} 
            </Typography>
        </Toolbar>
    )
}

EnhancedTableToolbar.propTypes = {
    totalRowsSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
        height: 'calc(100vh - 176px)'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

const EnhancedTable = ({ rows }) => {
    let history = useHistory();
    const { setGobalValue, state } = useContext(Ctx)
    const classes = useStyles()
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('layoutId')

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {

        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.layoutId)
            setGobalValue('rowsSelected', newSelecteds)
            return
        }
        setGobalValue('rowsSelected', [])
    }

    const handleClick = (event, id) => {
        const selectedIndex = state.rowsSelected.indexOf(id)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected.push(id)
            setGobalValue('rowsSelected', newSelected)
        } else if (selectedIndex === 0) {
            newSelected.pop()
            setGobalValue('rowsSelected', newSelected)
        }
    }

    const isSelected = tile => state.rowsSelected.indexOf(tile) !== -1

    const onSelectEdit = () => {
        const { rowsSelected } = state
        history.push({
            pathname: '/book-list-layout-form',
            state: {
                layoutId: rowsSelected,
            }
        })
        setGobalValue('editMode', true)
    }

    const onSelectDelete = async () => {
        const { rowsSelected, bookLists } = state
        if (window.confirm('Are you sure')) {
            const newBookList = bookLists.filter(list => {
                return list.layoutId !== rowsSelected[0]
            })
            const request = await deleteBookList(rowsSelected)
            const status = request.status
            const response = await request.text()

            if (status === 200) {
                setGobalValue('bookLists', newBookList)
                setGobalValue('rowsSelected', [])
                setGobalValue('sanckbarMsg', `${JSON.parse(response).name} was deleted`)
                //Talk to Frank about returning perhaps json objects 
                setGobalValue('isSanckbarOpen', true)
            } else {
                //talk to frank about 500 errors and records that can not be deleted 
            }
        }
    }

    const onSelectAdd = () => {
        history.push({
            pathname: '/book-list-layout-form',
            state: {
                editMode: false
            }
        })
    }

    return (
        <Fragment>
            <EnhancedTableToolbar
                totalRowsSelected={state.rowsSelected.length}
                onSelectEdit={onSelectEdit}
                onSelectDelete={onSelectDelete}
                onSelectAdd={onSelectAdd}
                listLenght={state.booklistLayout.length}
            />
            <div className={classes.tableWrapper}>
                <Table
                    //stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={state.rowsSelected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getSorting(order, orderBy))
                            .map(row => {
                                const isItemSelected = isSelected(row.layoutId)
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row.layoutId)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.layoutId}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            {row.layoutId}
                                        </TableCell>
                                        <TableCell padding='none'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.active ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                )
                            })}
                        
                    </TableBody>
                </Table>
            </div>
        </Fragment>
    )
}

export default EnhancedTable