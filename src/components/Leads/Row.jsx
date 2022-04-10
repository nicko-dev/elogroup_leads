import React from 'react';
import { Paper, styled } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { updateLead } from '../../storeConfig/slices/leadsSlice';

const Item = styled(Paper, { shouldForwardProp: prop => prop !== 'color' })(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#8A8C8D' : '#fff',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    alignSelf: 'center',
}));

const Row = ({ lead, stages, heading }) => {
    const dispatch = useDispatch();

    //função que atualiza o estado do componente quando um item é "dropado" no local adequado
    const handleChange = () => {
        let nextStage = lead.stage + 1;
        console.log(lead);
        let updatedLead = { ...lead, stage: nextStage };
        dispatch(updateLead(updatedLead));
    };

    //hook da biblioteca "react-dnd" para identificar os itens "dragáveis"
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: `${lead?.name}`,
            collect: monitor => ({ isDragging: !!monitor.isDragging() }),
        }),
        [lead]
    );

    //hook da biblioteca "react-dnd" para identificar os itens "dropáveis"
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: `${lead?.name}`,
            drop: () => handleChange(),
            collect: monitor => ({ isOver: !!monitor.isOver() }),
        }),
        [lead]
    );

    return (
        <>
            {stages.map((stage, idx) => {
                if (!lead) {
                    // sem lead retorna itens do cabeçalho (estágios)
                    return <Item key={idx}>{stage}</Item>;
                } else if (idx === lead.stage) {
                    // se tem lead e o indice do array é igual ao estágio da lead, retorna o Item "dragável" com o nome da lead
                    return (
                        <Item key={idx} ref={drag}>
                            {lead.name}
                        </Item>
                    );
                } else if (idx === lead.stage + 1) {
                    //se é o espaço à direita do estágio atual da lead, retorna o Item "dropável"
                    return <Item key={idx} ref={drop} style={{ border: isOver ? 'solid 3px' : '' }} />;
                } else {
                    //se não atende a nenhuma outra especificidade, retorna o item vazio
                    return <Item key={idx} />;
                }
            })}
            {//se for a linha de cabeçalho, retorna um elemento vazio, caso contrário retorna as opções da lead
                heading ? <div/> : <Item />
            }
        </>
    );
};

export default Row;
