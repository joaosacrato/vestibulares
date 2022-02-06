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
import { busca } from "../api/api";
import importAll from "../functions/importAll";

function Questao() {
  const [questao, setQuestao] = useState({});
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState(0);
  const [img, setImg] = useState("fuvest_2022_fisica_01.jpg");

  const url = "/fuvest";

  //importando tds imagens

  const images = importAll(
    require.context("../imagens", false, /\.(png|jpe?g|svg)$/)
  );


  

  useEffect(() => {

    //faz a busca no db para encontrar a questao onde estamos

    async function teste(){
      await busca(url, setQuestao, id);
    }
    teste()

    //após a mudança de estad da questao verifica se houve acerto ou erro

    if(answer===questao.resposta) console.log("você acertou")

    //muda a imagem
    
    setImg(questao.perguntaSrc);
    

  }, [id, questao.perguntaSrc]);


  // ao alterar a questao muda o valor da resposta do usuário

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      {/* Imagem da questao */}
      <CardMedia
        component="img"
        src={images[`${img}`]}
        alt="imagem da questão"
        sx={{ my: 2 }}
      />

      {/* Formulário */}

      <FormControl sx={{ display: "inline-block" }}>
        <RadioGroup name="radio-buttons-group" required>
          <FormLabel sx={{position: "absolute", ml: 2}} id="alternativas">Alternativas</FormLabel>
          <FormControlLabel
            value="a"
            control={<Radio onChange={handleAnswer} />}
            label="a)"
            sx={{ mt: 2}}
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
            setId(id - 1);
          }}
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setId(id + 1);
          }}
        >
          Próxima
        </Button>
      </Container>
    </Container>
  );
}

export default Questao;
