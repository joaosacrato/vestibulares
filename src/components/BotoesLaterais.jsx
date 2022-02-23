import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { busca } from "../api/api";

function BotoesLaterais() {
  // pega os valores pasados na url
  const { prova, ano, idQuestao } = useParams();


  const [listaQuestoes, setListaQuestoes] = useState([]);
  const url = `/${prova}?ano=${ano}`;

  const questoesRespondidas = JSON.parse(
    localStorage.getItem(`respostasUsuario-${prova}-${ano}`)
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function fazBusca() {
      await busca(url, setListaQuestoes, false);
    }
    fazBusca();
  }, [idQuestao]);

  return (
    <Container>
      {listaQuestoes.map((questao) => (
        <Button
          color={
            questao.nrQuestao.toString() ===
            Object.keys(questoesRespondidas)[questao.nrQuestao - 1]
              ? "success"
              : "primary"
          }
          variant="contained"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/vestibular/${prova}/${ano}/${event.target.innerText}`);
          }}
          key={questao.nrQuestao.toString()}
        >
          {questao.nrQuestao}
        </Button>
      ))}
    </Container>
  );
}

export default BotoesLaterais;
