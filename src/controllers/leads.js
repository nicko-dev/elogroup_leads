import { encryptLocal } from "./utils"

export const importLeads = () => {
    if(!encryptLocal.getItem("leads")){
        encryptLocal.setItem("leads", [])
    }
    return encryptLocal.getItem("leads")
}

export const setLeads = (leads) => {
    encryptLocal.setItem("leads", leads)
    return leads
}