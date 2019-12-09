import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
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
    { id: 'booklistId', numeric: true, disablePadding: false, label: 'Book list id', style: { display: 'none' } },
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
    { id: 'active', numeric: false, disablePadding: false, label: 'In use' },
]

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
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
        paddingRight: theme.spacing(0),
    },
    title: {
        flex: '1 1 100%',
    },
}))

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles()
    const { totalRowsSelected, onSelectEdit, onSelectDelete, onSelectAdd } = props

    return (
        <Toolbar className={classes.root}>
            {totalRowsSelected === 1 ?
                <Tooltip title="Edit selected book list">
                    <IconButton aria-label="Edit selected book list" onClick={() => { onSelectEdit() }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip> : null
            }
            {totalRowsSelected > 0 ?
                <Tooltip title="Delete selected book list" onClick={() => { onSelectDelete() }}>
                    <IconButton aria-label="Delete selected book list">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip> : null
            }

            <Tooltip title="Add new book list">
                <Fab color="secondary" aria-label="add" size="small" onClick={() => { onSelectAdd() }}>
                    <AddIcon />
                </Fab>
            </Tooltip>
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
    const [orderBy, setOrderBy] = React.useState('booklistId')

    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {

        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.booklistId)
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

    const handleChangePage = (event, newPage) => {
        setGobalValue('page', newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setGobalValue('page', 0)
    }

    const isSelected = tile => state.rowsSelected.indexOf(tile) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - state.page * rowsPerPage)

    const onSelectEdit = () => {
        const { rowsSelected } = state
        history.push({
            pathname: '/new-book-list',
            state: {
                bookListId: rowsSelected,
                editMode: true
            }
        })
        setGobalValue('editMode', true)
    }

    const onSelectDelete = async () => {
        const { rowsSelected, bookLists } = state

        if (window.confirm('Are you sure')) {
            const newBookList = bookLists.filter(list => {
                return list.booklistId !== rowsSelected[0]
            })
            setGobalValue('bookLists', newBookList)
            setGobalValue('rowsSelected', [])
        }
    }

    const onSelectAdd = () => {
        history.push({
            pathname: '/new-book-list',
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
            />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='small'
                    aria-label="enhanced table"
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
                            .slice(state.page * rowsPerPage, state.page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                const isItemSelected = isSelected(row.booklistId)
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row.booklistId)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.booklistId}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell style={{ display: 'none' }}>
                                            {row.booklistId}
                                        </TableCell>
                                        <TableCell padding='none'>
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="left">{row.owner}</TableCell>
                                        <TableCell align="left">{row.active ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={state.page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Fragment>
    )
}

export default EnhancedTable