import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const busca = async (url, setDado, buscaTodas = true) => {
  const resposta = await api.get(url);
  if (buscaTodas) setDado(resposta.data[0]);
  else setDado(resposta.data);
};
