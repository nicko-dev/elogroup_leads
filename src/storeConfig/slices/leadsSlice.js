import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { importLeads, setLeads } from "../../controllers/leads";

const leadsAdapter = createEntityAdapter({
  selectId: (lead) => lead.email,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

const initialState = leadsAdapter.getInitialState({
  status: "idle",
  message: null,
});

export const leads = createSlice({
  name: "leads",
  initialState,
  reducers: {
    getLeads: (state) => {
      if (!importLeads()) {
        setLeads([]);
      }
      const leadsArray = importLeads();
      leadsAdapter.setAll(state, leadsArray);
      state.status = "succeeded";
    },
    createLead: (state, { payload }) => {
      if (state.ids.includes(payload.email)) {
        state.message = {
          status: "failed",
          type: "form",
          msg: "Já existe uma Lead ligada a este email",
        };
      } else {
        const newLead = { ...payload, stage: 0, crearedAt: new Date() };
        const leadsArray = importLeads();
        setLeads([...leadsArray, newLead]);
        state.status = "updated";
        state.message = {
          status: "success",
          type:"form",
          msg: "Lead criada com sucesso",
        };
      }
    },
    updateLead: (state, { payload }) => {
      if (!state.ids.includes(payload.email)) {
        state.message = {
          status: "failed",
          msg: "Lead não encontrado",
        };
      } else {
        const leadsArray = importLeads();
        let newLeadsArray = leadsArray.filter(
          ({ email }) => payload.email !== email
        );
        setLeads([...newLeadsArray, payload]);
        state.status = "updated";
      }
    },
    removeLead: (state, { payload }) => {
      console.log(payload);
    },
    clearMsg: (state) => {
      state.message=null;
    }
  },
});

//action creators

export const { getLeads, createLead, updateLead, removeLead, clearMsg } = leads.actions;

//selectors

export const {
  selectAll: selectAllLeads,
  selectById: selectLeadById,
  selectIds: selectLeadIds,
} = leadsAdapter.getSelectors((state) => state.leads);

export default leads.reducer;
