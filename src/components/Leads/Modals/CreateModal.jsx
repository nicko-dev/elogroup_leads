import { Modal, Box } from '@mui/material';
import React from 'react';
import LeadForm from '../../LeadForm/LeadForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
};

const CreateModal = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <LeadForm />
            </Box>
        </Modal>
    );
};

export default CreateModal;
