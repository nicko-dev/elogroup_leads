import React from 'react'
import { Paper, Modal, Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeLead } from '../../../storeConfig/slices/leadsSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px'
};

const DeleteModal = ({open, lead, handleClose}) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeLead(lead))
    handleClose(lead);
  }

  return (
    lead && (
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
              <Paper sx={{ padding: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
                      <Typography variant='h6' fontWeight='bold' component='h1'>
                          Confirmação
                      </Typography>
                      <Typography sx={{ mt: 1 }}>Deletar a lead "{lead.name}" ?</Typography>
                      <Box sx={{display:'flex', mt:2, justifyContent:'space-evenly', width:'100%'}}>

                      <Button variant='contained' color='error' onClick={handleDelete}>
                          Deletar
                      </Button>
                      <Button variant='outlined' onClick={handleClose}>
                          Cancelar
                      </Button>
                      </Box>
                  </Box>
              </Paper>
          </Box>
      </Modal>
  ))
}

export default DeleteModal