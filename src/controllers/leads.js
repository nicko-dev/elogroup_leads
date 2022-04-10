export const importLeads = () => {
    if(!localStorage.getItem("leads")){
        localStorage.setItem("leads", JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem("leads"))
}

export const setLeads = (leads) => {
    localStorage.setItem("leads", JSON.stringify(leads))
    return leads
}