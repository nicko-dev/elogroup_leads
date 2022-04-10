import React from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = null;

    return (
        <AppBar sx={{ marginBottom: 2, borderRadius: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px', position: 'sticky' }}>
            <Typography variant='h4' fontWeight={500}>
                ELOGROUP Leads
            </Typography>
            <Toolbar>
                {user && (
                    <div>
                        <Avatar alt={user.name} src={user.imageUrl} />
                        <Typography variant='h6'>{user.name}</Typography>
                        <Button variant='contained' color='secondary'>
                            Logout
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
