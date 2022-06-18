import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./styles";
import { useEffect, useContext } from "react";
import axios from "axios";
import { API_URL_ALUNOS } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";
import { AlunosContext } from "../../context";

const AlunosListagem = () => {
  const { alunos, setAlunos } = useContext(AlunosContext);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = () => {
    axios.get(API_URL_ALUNOS).then((response) => {
      setAlunos(response.data);
    });
  };

  const deletarAluno = (aluno) => {
    axios
      .delete(API_URL_ALUNOS, { data: aluno })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const alunoIndex = alunos.findIndex(
          (elemento) => elemento.id === aluno.id
        );
        let newAlunos = [...alunos];
        newAlunos.splice(alunoIndex, 1);
        setAlunos(newAlunos);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  const editarAluno = (aluno) => {
    navigate(`/editar-alunos/${aluno.id}`);
  };

  return (
    <Box sx={{ marginTop: "25px" }}>
      {alunos.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Idade</StyledTableCell>
                <StyledTableCell>Cidade</StyledTableCell>
                <StyledTableCell>Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunos.map((aluno) => (
                <StyledTableRow>
                  <StyledTableCell>{aluno.nome}</StyledTableCell>
                  <StyledTableCell>{aluno.idade}</StyledTableCell>
                  <StyledTableCell>{aluno.cidade}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => editarAluno(aluno)} variant="text">
                      <EditIcon />
                    </Button>
                    <Button onClick={() => deletarAluno(aluno)} variant="text">
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Lottie options={defaultOptions} height={500} width={500} />
        </>
      )}
    </Box>
  );
};

export default AlunosListagem;
