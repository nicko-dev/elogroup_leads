import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { createLead } from "../../controllers/leads";

//array contendo os campos de texto do formulário
const textFields = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "tel",
    label: "Telefone",
  },
  {
    name: "email",
    label: "Email",
  },
];

//array contemdo os campos de checkbox do formulário
const oportunities = [
  {
    label: "RPA",
    value: "rpa",
  },
  {
    label: "Produto Digital",
    value: "produtoDigital",
  },
  {
    label: "Analytics",
    value: "analytics",
  },
  {
    label: "BPM",
    value: "bpm",
  },
];

const Form = () => {
  const { handleSubmit, control, setValue } = useForm();

  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState({});

  //inclui e exlui as opções marcadas/desmarcadas
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  //verifica se todos os valores possiveis estão marcados, se não, marca todos
  //caso estejam todos marcados, desmarca todos
  const handleSelectAll = () => {
    oportunities.every(({ value }) => selectedItems.includes(value))
      ? setSelectedItems([])
      : setSelectedItems(oportunities.map(({ value }) => value));
  };

  //registra os valores de checkbox marcados utilizando o hook setValue do hook-form
  useEffect(() => {
    setValue("oportunidades", selectedItems);
  }, [selectedItems]);

  const onSubmit = (data) => {
    const resp = createLead(data);
    console.log(resp)
    setMessage({ msg: resp.message });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        component={"form"}
        autoComplete="off"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Typography variant="h6">Criar Lead</Typography>
        {textFields.map(({ name, label }, idx) => (
          <Controller
            key={idx}
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={label}
                fullWidth
                required
                sx={{ margin: 1 }}
              />
            )}
          />
        ))}
        <Typography variant="body1" sx={{ fontWeight: "500" }}>
          Oportunidades
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginLeft: 2,
            marginBottom: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={oportunities.every(({ value }) =>
                    selectedItems.includes(value)
                  )}
                  onChange={handleSelectAll}
                />
              }
              label={"Todas as Opções"}
            />
            {oportunities.map(({ label, value }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.includes(value)}
                    onChange={() => handleSelect(value)}
                  />
                }
                label={label}
                key={value}
              />
            ))}
          </FormGroup>
        </Box>
        <span>{message?.msg}</span>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          half="true"
          onClick={handleSubmit(onSubmit)}
        >
          Cadastrar
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
