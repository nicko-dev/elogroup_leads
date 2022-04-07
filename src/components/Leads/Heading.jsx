import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Row from "./Row";

//tema do cabeçalho
const headingTheme = createTheme({ palette: { mode: "dark" } });

const Heading = ({ stages }) => {
  return (
    <ThemeProvider theme={headingTheme}>
      <Row stages={stages} />
    </ThemeProvider>
  );
};

export default Heading;
