import * as yup from "yup";

const leadSchema = yup.object({
    name: yup.string().required("Campo obrigatório").max(20, "Deve ter no máximo 20 caracteres").min(5, "Deve ter pelo menos 5 caracteres"),
    email: yup.string().required("Campo obrigatório").email("Digite um email válido"),
    phone: yup.string().required("Campo obrigatório"),
    oportunities: yup.array().of(yup.string()).min(1, "Selecione pelo menos uma oportunidade")
})

export default leadSchema;