import React, { useEffect, useState } from 'react';
import { Typography, Paper, TextField, Checkbox, Button, Box, FormControlLabel, FormGroup } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsg, createLead } from '../../storeConfig/slices/leadsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import MuiPhoneNumber from 'material-ui-phone-number';
import leadSchema from './leadSchema';

//array contendo os campos de checkbox do form
const oportunities = [
    {
        label: 'RPA',
        value: 'rpa',
    },
    {
        label: 'Produto Digital',
        value: 'produtoDigital',
    },
    {
        label: 'Analytics',
        value: 'analytics',
    },
    {
        label: 'BPM',
        value: 'bpm',
    },
];

const Form = () => {
    const dispatch = useDispatch();
    const { handleSubmit, control, setValue, reset, formState: { errors }} = useForm({
        resolver: yupResolver(leadSchema),
    });

    const message = useSelector(state => state.leads.message);
    const [selectedItems, setSelectedItems] = useState([]);

    //inclui e exlui as opções marcadas/desmarcadas
    const handleSelect = value => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter(item => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems(prevItems => [...prevItems, value]);
        }
    };

    //verifica se todas as checkboxes estão marcadas, se não, marca todas
    //caso estejam todas marcadas, desmarca todas
    const handleSelectAll = () => {
        oportunities.every(({ value }) => selectedItems.includes(value)) ? setSelectedItems([]) : setSelectedItems(oportunities.map(({ value }) => value));
    };

    //registra os valores de checkbox marcados utilizando o hook setValue do hook-form
    useEffect(() => {
        setValue('oportunities', selectedItems);
    }, [selectedItems]);

    const onSubmit = data => {
        dispatch(createLead(data));
    };

    const resetForm = () => {
        reset();
        setSelectedItems([]);
        dispatch(clearMsg());
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <Box component={'form'} autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h6'>Criar Lead</Typography>
                    <Box sx={{ width: '100%'}}>
                        <Controller name="name" control={control} defaultValue='' render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value} label="Nome *" fullWidth sx={{marginY:1}} />} />
                        <Typography variant={'body1'} sx={{ color: 'red' }}>
                            {errors.name?.message}
                        </Typography>
                        <Controller name="phone" control={control} defaultValue='' render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value} label="Telefone *" fullWidth sx={{marginY:1}}/>} />
                        <Typography variant={'body1'} sx={{ color: 'red' }}>
                            {errors.phone?.message}
                        </Typography>
                        <Controller name="email" control={control} defaultValue='' render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value} label="Email *" fullWidth sx={{marginY:1}}/>} />
                        <Typography variant={'body1'} sx={{ color: 'red' }}>
                            {errors.email?.message}
                        </Typography>
                    </Box>
                <Typography variant='body1' sx={{ fontWeight: '500' }}>
                    Oportunidades *
                </Typography>
                <Typography variant={'body1'} sx={{ color: 'red' }}>
                    {errors.oportunities?.message}
                </Typography>
                <Box sx={{ display: 'flex', width: '100%', marginLeft: 2, marginBottom: 2 }}>
                    <FormGroup>
                        <FormControlLabel label={'Todas as opções'} control={<Checkbox checked={oportunities.every(({ value }) => selectedItems.includes(value))} onChange={handleSelectAll} />} />
                        {oportunities.map(({ label, value }) => (
                            <FormControlLabel control={<Checkbox checked={selectedItems.includes(value)} onChange={() => handleSelect(value)} />} label={label} key={value} />
                        ))}
                    </FormGroup>
                </Box>
                <Typography variant={'body1'} sx={{ color: message?.status === 'success' ? 'blue' : 'red', marginBottom: 2 }}>
                    {message?.type === 'form' && message.msg}
                </Typography>
                <Button variant='contained' color='primary' size='large' onClick={handleSubmit(onSubmit)} sx={{ width: '60%', marginBottom: 1 }}>
                    Cadastrar
                </Button>
                <Button variant='outlined' color='primary' size='large' onClick={resetForm} sx={{ width: '60%' }}>
                    Limpar Campos
                </Button>
            </Box>
        </Paper>
    );
};

export default Form;
