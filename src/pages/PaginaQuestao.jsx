import React from "react";
import { Grid, Container } from "@mui/material";
import Questao from "../components/Questao";
import BotoesLaterais from "../components/BotoesLaterais";

function PaginaQuestao() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Questao />
        </Grid>
        <Grid item xs={4} sx={{ mt: 25 }}>
          <BotoesLaterais />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaginaQuestao;
