export const importLeads = () => {
    return JSON.parse(localStorage.getItem("leads"))
}

export const setLeads = (leads) => {
    localStorage.setItem("leads", JSON.stringify(leads))
    return leads
}