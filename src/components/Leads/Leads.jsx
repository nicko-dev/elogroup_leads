import React, { useEffect, useState } from 'react';
import { Button, Grow, Modal, styled, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Row from './Row';
import Heading from './Heading';

import { useDispatch, useSelector } from 'react-redux';
import { getLeads, selectAllLeads } from '../../storeConfig/slices/leadsSlice';
import CreateModal from './Modals/CreateModal';
import LeadModal from './Modals/LeadModal';
import DeleteModal from './Modals/DeleteModal';

//array de estágios possíveis da lead
const stages = ['Cliente Potencial', 'Dados Confirmados', 'Reunião Agendada'];

const gridTheme = createTheme({ columns: stages.length });

const Grid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${theme.columns}, 1fr) .25fr`,
    gridTemplateRows: theme.spacing(6),
    gridAutoRows: theme.spacing(11),
    gap: theme.spacing(1),
}));

const Leads = () => {
    const dispatch = useDispatch();
    const leadsStatus = useSelector(state => state.leads.status);
    const leads = useSelector(selectAllLeads);

    const [showLeadForm, setShowLeadForm] = useState(false);
    const [showLead, setShowLead] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('')

    const handleShowLeadForm = () => {
        setShowLeadForm(prev => !prev);
    };

    const handleShowLead = lead => {
        !showLead ? setShowLead(lead) : setShowLead('') ;
    };

    const handleConfirmDelete = lead => {
        !confirmDelete ? setConfirmDelete(lead) : setConfirmDelete('') ;
    };


    useEffect(() => {
        if (leadsStatus !== 'succeeded') {
            dispatch(getLeads());
        }
    }, [leadsStatus]);


    return (
        <>
            <CreateModal open={showLeadForm} handleClose={handleShowLeadForm} />
            <LeadModal open={!!showLead} handleClose={handleShowLead} lead={showLead}/>
            <DeleteModal open={!!confirmDelete} handleClose={handleConfirmDelete} lead={confirmDelete}/>
            <Button size='large' variant='contained' color='primary' sx={{ marginLeft: 3, marginBottom: 2 }} onClick={handleShowLeadForm}>
                Criar Lead
            </Button>
            <ThemeProvider theme={gridTheme}>
                <Grow in>
                    <Grid sx={{ marginX: 1 }}>
                        <Heading stages={stages} />
                        {leads.map((lead, idx) => (
                            <Row key={idx} lead={lead} stages={stages} handleInfo={handleShowLead} handleDelete={handleConfirmDelete}/>
                        ))}
                    </Grid>
                </Grow>
            </ThemeProvider>
        </>
    );
};

export default Leads;
