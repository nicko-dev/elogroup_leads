import React from "react";
import { Typography, Paper, TextField, Button, styled } from "@mui/material";

const InnerForm = styled('form', {shouldForwardProp: (prop) => prop!=="sx"})(()=>({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}))

const Field = styled(TextField)(({theme})=>({
    margin: theme.spacing(1)
}))

const Form = () => {
  return (
    <Paper sx={{ padding: 2}}>
      <InnerForm
        autoComplete="off"
      >
        <Typography variant="h6">Criar Lead</Typography>
        <Field
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
        />
        <Field
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
        />
        <Field
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
        />
        <Field
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </InnerForm>
    </Paper>
  );
};

export default Form;
