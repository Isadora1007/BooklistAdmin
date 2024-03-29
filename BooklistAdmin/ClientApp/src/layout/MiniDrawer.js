﻿import React, { useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import CastConnected from '@material-ui/icons/CastConnected'
import Palette from '@material-ui/icons/Palette'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import Grid from './AppBody'
import { Link } from "react-router-dom"
import SigninBtn from '../components/SignInBtn'
import SignOutBtn from '../components/SignOutBtn'
import UserName from '../components/UserName'
import { Ctx } from '../Context'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        height: '100vh',
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

const PersistentDrawer = () => {
    const classes = useStyles()
    const theme = useTheme()
    const { state } = useContext(Ctx)
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <UserName />
                    {state.isAuth ? <SignOutBtn /> : <SigninBtn />}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={'Book list'} component={Link} to='/'>
                        <ListItemIcon><LibraryBooks /></ListItemIcon>
                        <ListItemText primary={'Book list'} />
                    </ListItem>
                    <ListItem button key={'Displays'} component={Link} to='/displays'>
                        <ListItemIcon><CastConnected /></ListItemIcon>
                        <ListItemText primary={'Displays'} />
                    </ListItem>
                    <ListItem button key={'Book list layout'} component={Link} to='/book-list-layout'>
                        <ListItemIcon><Palette /></ListItemIcon>
                        <ListItemText primary={'Book list layout'} />
                    </ListItem>
                    <ListItem button key={'Collections'} component={Link} to='/collections'>
                        <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
                        <ListItemText primary={'Collections'} />
                    </ListItem>
                </List>
            </Drawer>
            <main
                id='test'
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid />
            </main>
        </div>
    )
}

export default PersistentDrawer
