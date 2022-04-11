import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().required('Digite seu email'),
    password: yup.string().required('Digite sua senha'),
});

export default loginSchema;
