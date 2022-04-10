export const importUsers = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('users'));
};

export const setUsers = auth => {
    localStorage.setItem('users', JSON.stringify(auth));
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
    sessionStorage.setItem("auth", JSON.stringify(userInfo))
    return userInfo;
};
