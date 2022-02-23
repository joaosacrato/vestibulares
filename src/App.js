import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PaginaInicial from "./pages/PaginaInicial";
import Questao from "./components/Questao";
import Pagina404 from "./pages/Pagina404";
import PaginaQuestao from "./pages/PaginaQuestao";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route
          path="/vestibular/:prova/:ano/:idQuestao"
          element={<PaginaQuestao />}
        />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </Router>
  );
}

export default App;
