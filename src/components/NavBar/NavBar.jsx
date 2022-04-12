import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, Grow, Toolbar, Typography, useMediaQuery, useTheme, Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storeConfig/slices/authSlice';

const stringToColor = string => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

const avatarProps = (firstName, lastName) => {
    const name = firstName + ' ' + lastName;
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: firstName.charAt(0) + lastName.charAt(0),
    };
};

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const theme = useTheme();
    const biggerView = useMediaQuery(theme.breakpoints.up('md'));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar sx={{ marginBottom: 2, borderRadius: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', position: 'sticky' }}>
            <Typography variant='h4' fontWeight={500}>
                ELOGROUP Leads
            </Typography>
            <Toolbar>
                {user && (
                    <Grow in>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {biggerView ? (
                                <>
                                    <Avatar alt={user.firstName} {...avatarProps(user.firstName, user.lastName)} />
                                    <Typography variant='h6' sx={{ marginX: 4 }}>
                                        {user.firstName}
                                    </Typography>
                                    <Button variant='contained' color='secondary' onClick={() => dispatch(logout())}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Avatar alt={user.firstName} {...avatarProps(user.firstName, user.lastName)} onClick={handleClick} />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        >
                                        <Button
                                            color='secondary'
                                            onClick={() => {
                                                handleClose();
                                                dispatch(logout());
                                            }}>
                                            Logout
                                        </Button>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Grow>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
