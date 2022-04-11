import { createSlice } from '@reduxjs/toolkit';
import { clearAuth, getAuth, loginUser, registerUser } from '../../controllers/auth';

const initialState = {
    user: getAuth() ? getAuth() : null,
    message: null,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        singUp: (state, { payload }) => {
            if (registerUser(payload)) {
                state.message = {
                    status: 'success',
                    type: 'register',
                    msg: 'Usuário criado com sucesso',
                };
            } else {
                state.message = {
                    status: 'failed',
                    type: 'register',
                    msg: 'O email digitado já está em uso',
                };
            }
        },
        login: (state, { payload }) => {
            const user = loginUser(payload);
            if (!user) {
                state.message = {
                    status: 'failed',
                    type: 'login',
                    msg: 'Email e/ou password inválidos',
                };
            } else {
                state.user = user;
                state.message = null;
            }
        },
        logout: (state) => {
            clearAuth();
            state.user = null;
        },
        clearAuthMsg: (state) => {
            state.message = null;
        },
    },
});

//action creators

export const { singUp, login, logout, clearAuthMsg } = auth.actions;

export default auth.reducer;
