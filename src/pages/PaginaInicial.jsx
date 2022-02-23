import React from "react";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function PaginaInicial() {

    const navigate = useNavigate();

  return (
    <>
      <Typography>Escolha a prova:</Typography>
      <Link to={`/vestibular/fuvest/2022/1`}>
        <Button>Fuvest 2022</Button>
      </Link>
      <Link to={`/vestibular/unesp/2020/1`}>
        <Button>Unesp 2020</Button>
      </Link>
    </>
  );
}

export default PaginaInicial;
