import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TreeItem from '@material-ui/lab/TreeItem';
import { navigate } from 'gatsby';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    item: {
        display: 'block',
        paddingTop: 0,
        paddingBottom: 0,
    },
    itemLeaf: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        letterSpacing: 0,
        justifyContent: 'flex-start',
        textTransform: 'none',
        width: '100%',
    },
    buttonLeaf: {
        letterSpacing: 0,
        justifyContent: 'flex-start',
        textTransform: 'none',
        width: '100%',
        fontWeight: theme.typography.fontWeightRegular,
        '&.depth-0': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
    },
}));

const getLocalStorage = ()=> {
     const windowGlobal = typeof window !== 'undefined' && window;
     return windowGlobal.localStorage;
};

const getTreeItemsFromData = (treeItems) => {

    return treeItems.map(treeItemData => {
        let children = undefined;
        const {
            depth,
            href,
            onClick,
            openImmediately = false,
            topLevel = false,
            title,
            linkProps,
            ...other
        } = treeItems;
        const classes = useStyles();
        const [open, setOpen] = React.useState(openImmediately);

        const handleClick = (event) => {
            setOpen(oldOpen => !oldOpen);
            event.preventDefault();
            if (treeItemData.href) {
                navigate(treeItemData.href);
            }
        };

        const style = {
            paddingLeft: 8 * (3 + 2 * depth),
        };

        const [selectedIndex, setSelectItem] = React.useState(1);

        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }

        return (
            <ListItem className={classes.itemLeaf} disableGutters {...other}>
                <Button
                    component={Link}
                    naked
                    activeClassName={`drawer-active ${classes.active}`}
                    className={clsx(classes.buttonLeaf, `depth-${depth}`)}
                    disableTouchRipple
                    classes={{
                        root: classes.button,
                        label: topLevel ? 'algolia-lvl0' : '',
                    }}
                    onClick={handleClick}
                    style={style}
                >
                    {treeItemData.key}
                </Button>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </ListItem>
            );
    });
};

const getExpandedNodesFromLocalStorage = ()=>{
    const localStorage = getLocalStorage();
    return localStorage && JSON.parse(localStorage.getItem("codeceptjs:documentation:sidebar:docs"));
};

const useStylesB = makeStyles({
    root: {
        // height: 264,
        // flexGrow: 1,
        // maxWidth: 400,
    },
});

export default function FileSystemNavigator({ treeItems }) {
    const classes = useStylesB();
    const handleChange = (event, nodes) => {
        const localStorage = getLocalStorage();
        localStorage && localStorage.setItem("codeceptjs:documentation:sidebar:docs", JSON.stringify(nodes));
    };
    return (
        <List
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultExpanded={getExpandedNodesFromLocalStorage()}
            onNodeToggle={handleChange}
            defaultEndIcon={<div style={{ width: 0.2 }} />}
        >
            {getTreeItemsFromData(treeItems)}
        </List>
    );
}
