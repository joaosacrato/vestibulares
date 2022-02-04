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

function Questao() {
  const [questao, setQuestao] = useState({});
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState(0);
  const [img, setImg] = useState("fuvest_2022_fisica_01.jpg");

  const url = "/fuvest";

  //importando tds imagens

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../imagens", false, /\.(png|jpe?g|svg)$/)
  );

  useEffect(() => {
    busca(url, setQuestao, id);
  }, [id]);

  useEffect(() => {
    setImg(questao.perguntaSrc);
    console.log(id);
  });

  useEffect(()=>{
    if(answer===questao.resposta) console.log("você acertou")
  })

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <CardMedia
        component="img"
        src={images[`${img}`]}
        alt="imagem da questão"
        sx={{ my: 5 }}
      />

      <FormControl sx={{ display: "inline-block" }}>
        <FormLabel id="alternativas">Alternativas</FormLabel>
        <RadioGroup name="radio-buttons-group" sx={{ my: 2 }}>
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
          sx={{ mr: 2 }}
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
