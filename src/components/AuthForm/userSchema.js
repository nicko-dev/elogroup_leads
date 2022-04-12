import * as yup from 'yup';

const userSchema = yup.object({
    firstName: yup.string().required('Campo obrigatório'),
    lastName: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório').email('Digite um email válido'),
    password: yup
        .string()
        .required('Campo obrigatório')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#%&])(?=.{8,})/, 'Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Os passwords devem ser iguais'),
});

export default userSchema;
