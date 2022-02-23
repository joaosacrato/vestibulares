import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  Container,
  Button,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { busca } from "../api/api";
import importAll from "../functions/importAll";

function Questao() {
  // pega os valores pasados na url
  const { prova, ano, idQuestao } = useParams();

  const navigate = useNavigate();

  const [questao, setQuestao] = useState({});
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [respostasUsuario, setRespostasUsuario] = useState(() => {
    const valorInicial = JSON.parse(
      localStorage.getItem(`respostasUsuario-${prova}-${ano}`)
    );
    return valorInicial || {};
  });

  // dentro da db procura pela prova especifica e pelo ano
  const url = `/${prova}?ano=${ano}&nrQuestao=${idQuestao}`;

  //importando tds imagens

  const images = importAll(
    require.context("../imagens", false, /\.(png|jpe?g|svg)$/)
  );

  useEffect(() => {
    //faz a busca no db para encontrar a questao onde estamos
    console.log(`a imagem é: ${questao.perguntaSrc}`);

    async function fazBusca() {
      await busca(url, setQuestao);
    }
    fazBusca();

    localStorage.setItem(
      `respostasUsuario-${prova}-${ano}`,
      JSON.stringify(respostasUsuario)
    );

    console.log(questao);
    //após a mudança de estad da questao verifica se houve acerto ou erro

    if (respostaUsuario === questao.resposta) console.log("você acertou");

    console.log(respostasUsuario);
  }, [idQuestao, respostasUsuario]);

  // ao alterar a questao muda o valor da resposta do usuário

  const handleAnswer = (event) => {
    setRespostaUsuario(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      {/* Imagem da questao */}
      <CardMedia
        component="img"
        src={images[`${questao.perguntaSrc}`]}
        alt="imagem da questão"
        sx={{ my: 2 }}
      />

      {/* Formulário */}

      <FormControl sx={{ display: "inline-block" }}>
        <RadioGroup name="radio-buttons-group" required>
          <FormLabel sx={{ position: "absolute", ml: 2 }} id="alternativas">
            Alternativas
          </FormLabel>
          <FormControlLabel
            value="a"
            control={<Radio onChange={handleAnswer} />}
            label="a)"
            sx={{ mt: 2 }}
            labelPlacement="start"
          />
          <FormControlLabel
            value="b"
            control={<Radio onChange={handleAnswer} />}
            label="b)"
            labelPlacement="start"
          />
          <FormControlLabel
            value="c"
            control={<Radio onChange={handleAnswer} />}
            label="c)"
            labelPlacement="start"
          />
          <FormControlLabel
            value="d"
            control={<Radio onChange={handleAnswer} />}
            label="d)"
            labelPlacement="start"
          />
          <FormControlLabel
            value="e"
            control={<Radio onChange={handleAnswer} />}
            label="e)"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
      <Container sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          sx={{ mr: 3 }}
          type="button"
          onClick={(event) => {
            event.preventDefault();

            var novoIdQuestao = parseInt(idQuestao) - 1;

            navigate(`/vestibular/${prova}/${ano}/${novoIdQuestao}`);
          }}
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={(event) => {
            event.preventDefault();

            if (respostaUsuario !== "") {
              setRespostasUsuario({
                ...respostasUsuario,
                [idQuestao]: respostaUsuario,
              });
            }

            console.log(
              `respostas usuario: ${JSON.stringify(respostasUsuario)}`
            );

            var novoIdQuestao = parseInt(idQuestao) + 1;
            navigate(`/vestibular/${prova}/${ano}/${novoIdQuestao}`);
          }}
        >
          Próxima
        </Button>
      </Container>
    </Container>
  );
}

export default Questao;
