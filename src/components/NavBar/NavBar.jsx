import React from 'react';
import { AppBar, Avatar, Box, Button, Grow, Toolbar, Typography } from '@mui/material';
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

    return (
        <AppBar sx={{ marginBottom: 2, borderRadius: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px', position: 'sticky' }}>
            <Typography variant='h4' fontWeight={500}>
                ELOGROUP Leads
            </Typography>
            <Toolbar>
                {user && (
                    <Grow in>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={user.firstName} {...avatarProps(user.firstName, user.lastName)} />
                            <Typography variant='h6' sx={{ marginX: 4 }}>
                                {user.firstName}
                            </Typography>
                            <Button variant='contained' color='secondary' onClick={() => dispatch(logout())}>
                                Logout
                            </Button>
                        </Box>
                    </Grow>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
