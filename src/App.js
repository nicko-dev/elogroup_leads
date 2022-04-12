import React from 'react';
import { Container } from '@mui/material';
import Leads from './components/Leads/Leads';
import NavBar from './components/NavBar/NavBar';
import AuthForm from './components/AuthForm/AuthForm';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
    const user = useSelector(state => state.auth?.user);

    return (
        <Container maxWidth='lg'>
            <NavBar />
            {!user ? (
                <Routes>
                    <Route path='/auth' element={<AuthForm />} />
                    <Route path='*' element={<Navigate to='/auth' replace={true} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path='/home' element={<Leads />} />
                    <Route path='*' element={<Navigate to='/home' replace={true} />} />
                </Routes>
            )}
        </Container>
    );
};

export default App;
