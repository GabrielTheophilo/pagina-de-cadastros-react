import { useRoutes } from "react-router-dom";
import AlunosListagem from "../pages/alunos/AlunosListagem";
import CadastrarAlunos from "../pages/alunos/CadastrarAlunos";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { TemaContext } from "../context";
import tema from "../tema";
import Login from "../pages/Login";
import MateriasListagem from "../pages/materias/MateriasListagem";
import CadastrarMaterias from "../pages/materias/CadastrarMaterias";

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <AlunosListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id", element: <CadastrarAlunos /> },
    { path: "/login", element: <Login /> },
    { path: "/listar-materias", element: <MateriasListagem /> },
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
  ]);

  return routes;
};

const App = () => {
  const { temaSelecionado, setTemaSelecionado } = useContext(TemaContext);
  // tema.claro ou tema["claro"] fazem a mesma coisa
  return (
    <Container maxWidth="md" sx={tema[temaSelecionado]}>
      <Routes />
    </Container>
  );
};

export default App;
