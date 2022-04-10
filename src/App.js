import React from "react";
import { Container, Box, styled } from "@mui/material";
import Leads from "./components/Leads/Leads";
import LeadForm from "./components/LeadForm/LeadForm";
import NavBar from "./components/NavBar/NavBar";
import AuthForm from "./components/AuthForm/AuthForm";

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
      <NavBar />
      <AuthForm />
      <Home>
        <LeadsContainer>
          <Leads />
        </LeadsContainer>
        <FormContainer>
          <LeadForm />
        </FormContainer>
      </Home>
    </Container>
  );
};

export default App;
