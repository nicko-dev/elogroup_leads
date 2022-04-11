import React, { useEffect, useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearAuthMsg, login, singUp } from '../../storeConfig/slices/authSlice';

import Input from './Input';
import userSchema from './userSchema';
import loginSchema from './loginSchema';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(state => state.auth.message);
    const user = useSelector(state => state.auth?.user)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignUp, setIsSignup] = useState(true);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: !isSignUp ? yupResolver(userSchema) : yupResolver(loginSchema),
    });

    const onSubmit = data => {
        isSignUp ? dispatch(login(data)) : dispatch(singUp(data));
    };

    const switchMode = () => {
        setIsSignup(!isSignUp);
        setShowPassword(false);
        dispatch(clearAuthMsg())
        reset();
    };

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Container component='main' maxWidth='xs' sx={{ marginY: 18 }}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                <Avatar sx={{ margin: 1, backgroundColor: 'warning.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{!isSignUp ? 'Cadastrar Usuário' : 'Login'}</Typography>
                <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                    <Grid container spacing={2} justifyContent='center' sx={{ paddingY: 3 }}>
                        {!isSignUp && (
                            <>
                                <Input name='firstName' label='Nome  *' type='text' autoFocus={isSignUp ? false : true} half register={register} errors={errors} />
                                <Input name='lastName' label='Sobrenome *' type='text' half register={register} errors={errors} />
                            </>
                        )}
                        <Input name='email' label='Email *' type='text' autoFocus={!isSignUp ? false : true} register={register} errors={errors} />
                        <Input name='password' label='Password *' register={register} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} errors={errors} />
                        {!isSignUp && (
                            <>
                                <Input name='confirmPassword' label='Corfirmação de Password *' register={register} type={showConfirmPassword ? 'text' : 'password'} handleShowPassword={handleShowConfirmPassword} errors={errors} />
                            </>
                        )}
                        <Grid item>
                            <Typography variant={'body1'} sx={{ color: message?.status === 'success' ? 'blue' : 'red', marginBottom: 2 }}>
                                {message?.msg}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' sx={{ marginBottom: 2 }}>
                        <Grid item width='70%'>
                            <Button type='submit' fullWidth variant='contained' color='primary'>
                                {isSignUp ? 'Login' : 'Cadastrar'}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{!isSignUp ? 'Já possui uma conta? Faça Login' : 'Criar conta'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AuthForm;
