export const getLeads = () => {
  if (!localStorage.getItem("leads")) {
    localStorage.setItem("leads", JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem("leads"));
};

export const createLead = (newLead) => {
  const leads = JSON.parse(localStorage.getItem("leads"));
  if (leads.find(({ email }) => email === newLead.email)) {
    return { message: "There is already a lead linked to this email" };
  }
  const updatedLeads = [...leads, newLead];
  localStorage.setItem("leads", JSON.stringify(updatedLeads));
  return { message: "Lead sucessfully created" };
};
