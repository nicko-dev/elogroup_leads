import React, { useEffect, useState } from "react";
import { Grow, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Row from "./Row";
import Heading from "./Heading";

import { useDispatch, useSelector } from "react-redux";
import { getLeads, selectAllLeads } from "../../storeConfig/slices/leadsSlice";

//array de estágios possíveis da lead
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
  const dispatch = useDispatch();
  const leadsStatus = useSelector((state) => state.leads.status);
  const leads = useSelector(selectAllLeads);

  useEffect(() => {
    if (leadsStatus !== "succeeded") {
      dispatch(getLeads());
    }
  }, [leadsStatus]);

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
