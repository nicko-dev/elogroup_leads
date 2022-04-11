import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { importLeads, setLeads } from '../../controllers/leads';

const leadsAdapter = createEntityAdapter({
    selectId: lead => lead.name,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = leadsAdapter.getInitialState({
    status: 'idle',
    message: null,
});

export const leads = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        getLeads: state => {
            const leadsArray = importLeads();
            leadsAdapter.setAll(state, leadsArray);
            state.status = 'succeeded';
        },
        createLead: (state, { payload }) => {
            if (state.ids.includes(payload.name)) {
                state.message = {
                    status: 'failed',
                    type: 'form',
                    msg: 'Já existe uma Lead com este nome',
                };
            } else {
                const newLead = { ...payload, stage: 0};
                const leadsArray = importLeads();
                setLeads([...leadsArray, newLead]);
                state.status = 'updated';
                state.message = {
                    status: 'success',
                    type: 'form',
                    msg: 'Lead criada com sucesso',
                };
            }
        },
        updateLead: (state, { payload }) => {
            if (!state.ids.includes(payload.name)) {
                state.message = {
                    status: 'failed',
                    msg: 'Lead não encontrado',
                };
            } else {
                const leadsArray = importLeads();
                let newLeadsArray = leadsArray.filter(({ name }) => payload.name !== name);
                setLeads([...newLeadsArray, payload]);
                state.status = 'updated';
            }
        },
        removeLead: (state, { payload }) => {
            if (!state.ids.includes(payload.name)) {
                state.message = {
                    status: 'failed',
                    msg: 'Lead não encontrado',
                };
            } else {
                const leadsArray = importLeads();
                let newLeadsArray = leadsArray.filter(({ name }) => payload.name !== name);
                setLeads(newLeadsArray);
                state.status = 'updated';
            }
        },
        clearLeadMsg: state => {
            state.message = null;
        },
    },
});

//action creators

export const { getLeads, createLead, updateLead, removeLead, clearLeadMsg } = leads.actions;

//selectors

export const { selectAll: selectAllLeads, selectById: selectLeadById, selectIds: selectLeadIds } = leadsAdapter.getSelectors(state => state.leads);

export default leads.reducer;
