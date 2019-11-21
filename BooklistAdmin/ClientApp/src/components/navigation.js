import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CastConnected from '@material-ui/icons/CastConnected';
import Palette from '@material-ui/icons/Palette';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const NavBar = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key={'Book list'}>
                    <ListItemIcon><LibraryBooks /></ListItemIcon>
                    <ListItemText primary={'Book list'} />
                </ListItem>
                <ListItem button key={'Displays'}>
                    <ListItemIcon><CastConnected /></ListItemIcon>
                    <ListItemText primary={'Displays'} />
                </ListItem>
                <ListItem button key={'Book list layout'}>
                    <ListItemIcon><Palette /></ListItemIcon>
                    <ListItemText primary={'Book list layout'} />
                </ListItem>
                <ListItem button key={'Collections'}>
                    <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
                    <ListItemText primary={'Collections'} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

export default NavBar;