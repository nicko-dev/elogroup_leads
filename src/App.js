import React from "react";
import { Container, Box, styled } from "@mui/material";
import Leads from "./components/Leads/Leads";
import Form from "./components/Form/Form";

const Home = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const LeadsContainer = styled(Box)(() => ({
  width:  "60%",
}));

const FormContainer = styled(Box)(() => ({
  width: "30%",
}));

const App = () => {
  return (
    <Container maxWidth="lg">
      <Home>
        <LeadsContainer>
          <Leads />
        </LeadsContainer>
        <FormContainer>
          <Form />
        </FormContainer>
      </Home>
    </Container>
  );
};

export default App;
