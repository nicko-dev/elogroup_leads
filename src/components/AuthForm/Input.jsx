import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ half, name, label, autoFocus, type, handleShowPassword, register, required }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                variant='outlined'
                fullWidth
                name={name}
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={{
                    endAdornment: (name === 'password' || name === 'confirmPassword') && (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </InputAdornment>
                    ),
                    inputProps: { ...register(name, { required }), defaultValue: null },
                }}
            />
        </Grid>
    );
};

export default Input;
