import React from "react";
import { Grow, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Row from "./Row";
import Heading from "./Heading";

const leads = [
  { id: 1, name: "Empresa 1" },
  { id: 2, name: "Empresa 2" },
  { id: 3, name: "Empresa 3" },
  { id: 4, name: "Empresa 4" },
  { id: 5, name: "Empresa 5" },
];

const stages = ["Cliente Potencial", "Dados Confirmados", "Reunião Agendada"];

const gridTheme = createTheme({ columns: stages.length });

const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${theme.columns}, 1fr)`,
  gridTemplateRows: theme.spacing(6),
  gridAutoRows: theme.spacing(11),
  gap: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Leads = () => {
  return (
    <ThemeProvider theme={gridTheme}>
      <Grow in>
        <Grid>
          <Heading stages={stages} />
          {leads.map((lead, idx) => (
            <Row key={idx} lead={lead} stages={stages} />
          ))}
        </Grid>
      </Grow>
    </ThemeProvider>
  );
};

export default Leads;
