import React, { useState } from 'react';
import { AppBar, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box, Drawer, ListItemButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from "../redux/actions";
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function DynamicSidebar(props) {
    const dispatch = useDispatch();
    const { window, items } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useSelector((state) => state.loginReducer);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = (val) => {
        if (val === 'Logout') {
            dispatch({
                type: LOGOUT,
            });
        }
    };

    const drawer = (
        <>
            <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h6" noWrap component="div">
                    ADILSHERDOTPRO
                </Typography>
            </Toolbar>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
                {items.map((item, index) => {
                    if ((user?.user?.kind === 'client' && item.text === 'Users') || (user?.user?.kind === 'admin' && item.text === 'Upload Docs')) {
                        return null;
                    }
                    return (

                        <ListItem button key={index} disablePadding onClick={() => handleLogout(item.text)}>
                            <ListItemButton component={Link} to={item.routePath}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;


    return (
        <>
            <AppBar
                component="nav"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        size="small"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, width: "auto" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                    <Typography variant="h6" noWrap component="div">
                        Welcome {user?.user?.item?.firstName}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Role: {user?.user?.kind}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

export default DynamicSidebar;
