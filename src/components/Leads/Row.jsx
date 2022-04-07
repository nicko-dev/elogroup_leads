import React, { useState } from "react";
import { Paper, styled } from "@mui/material";

import { useDrag, useDrop } from "react-dnd";

const Item = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#8A8C8D" : "#fff",
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.primary,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "500",
  alignSelf: "center",
}));

const Row = ({ lead, stages }) => {
  const [currentStage, setCurrentStage] = useState(0);

  //função que atualiza o estado do componente quando um item é "dropado" no local adequado
  const handleChange = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  //hook da biblioteca "react-dnd" para identificar os itens "dragáveis"
  const [{ isDragging }, drag] = useDrag(() => ({
    type: `${lead?.id}`,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //hook da biblioteca "react-dnd" para identificar os itens "dropáveis"
  const [{ isOver }, drop] = useDrop(() => ({
    accept: `${lead?.id}`,
    drop: () => handleChange(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  console.log(currentStage);

  return stages.map((stage, idx) => {
    if (!lead) {
      // sem lead retorna itens do cabeçalho (estágios)
      return <Item key={idx}>{stage}</Item>;
    } else if (idx === currentStage) {
      // se tem lead e o indice do array é igual ao estágio da lead, retorna o Item "dragável" com o nome da empresa
      return (
        <Item
          key={idx}
          ref={drag}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {lead.name}
        </Item>
      );
    } else if (idx === currentStage + 1) {
      //se é o espaço à direita do estágio atual da lead, retorna o Item "dropável"
      return (
        <Item
          key={idx}
          ref={drop}
          style={{ border: isOver ? "solid 3px" : "" }}
        />
      );
    } else {
      //se não atende a nenhuma outra especificidade, retorna o item vazio
      return <Item key={idx} />;
    }
  });
};

export default Row;
