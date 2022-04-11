import React from 'react';
import { Paper, Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
};

const LeadModal = ({ open, lead, handleClose }) => {
    const showOportunities = () => {
        let newArray = [];
        if (lead.oportunities.includes('rpa')) newArray.push(' RPA');
        if (lead.oportunities.includes('produtoDigital')) newArray.push(' Produto Digital');
        if (lead.oportunities.includes('analytics')) newArray.push(' Analytics');
        if (lead.oportunities.includes('bpm')) newArray.push(' BPM');
        return newArray.toString();
    };

    return (
        lead && (
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Paper sx={{ padding: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h4' fontWeight='bold' component='h1'>
                                {lead.name}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>Telefone: {lead.phone}</Typography>
                            <Typography sx={{ mt: 1 }}>Email: {lead.email}</Typography>
                            <Typography sx={{ mt: 1 }}>Interesses: {showOportunities()}</Typography>
                            <Typography variant='h6' fontWeight='bold' component='h1' sx={{ mt: 3 }}>
                                Informações do criador
                            </Typography>
                            <Typography sx={{ mt: 1 }}>Nome: {lead.createdBy.firstName + ' ' + lead.createdBy.lastName}</Typography>
                            <Typography sx={{ mt: 1 }}>Email: {lead.createdBy.email}</Typography>
                            <Button size='' sx={{ alignSelf: 'center', mt: 2 }} onClick={handleClose}>
                                Fechar
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        )
    );
};

export default LeadModal;
