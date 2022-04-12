import { encryptLocal, encryptSession } from "./utils"

export const importUsers = () => {
    if (!encryptLocal.getItem('users')) {
        encryptLocal.setItem('users', []);
    }
    return encryptLocal.getItem('users');
};

export const setUsers = auth => {
    encryptLocal.setItem('users', auth);
    return auth;
};

export const findUser = email => {
    const users = importUsers();
    return users.find(user => user.email === email);
};

export const registerUser = newUser => {
    if (findUser(newUser.email)) {
        return 0;
    }
    const users = importUsers();
    const { confirmPassword, ...userServer } = newUser;
    setUsers([...users, userServer]);
    return userServer;
};

export const loginUser = loginInfo => {
    const user = findUser(loginInfo.email);
    if (!user || user?.password !== loginInfo.password) {
        return 0;
    }
    const { password, ...userInfo } = user;
    encryptSession.setItem('auth', userInfo);
    return userInfo;
};

export const setAuth = info => {
    encryptSession.setItem('auth', info);
    return info;
};

export const getAuth = () => {
    return encryptSession.getItem('auth');
};

export const clearAuth = () => {
    encryptSession.clear()
}
