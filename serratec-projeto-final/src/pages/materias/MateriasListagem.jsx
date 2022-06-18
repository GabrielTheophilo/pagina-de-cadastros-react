import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL_MATERIA } from "../../constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";

const MateriasListagem = () => {
  const [materias, setMaterias] = useState([]);
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
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URL_MATERIA).then((response) => {
      setMaterias(response.data);
    });
  };

  const deleteMateria = (materia) => {
    axios
      .delete(API_URL_MATERIA, { data: materia })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const materiaIndex = materias.findIndex(
          (elemento) => elemento.id === materia.id
        );
        let newMaterias = [...materias];
        newMaterias.splice(materiaIndex, 1);
        setMaterias(newMaterias);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  return (
    <Box sx={{ marginTop: "25px" }}>
      {materias.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Título</StyledTableCell>
                <StyledTableCell>Professor</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materias.map((materia) => (
                <StyledTableRow key={materia.id}>
                  <StyledTableCell>{materia.titulo}</StyledTableCell>
                  <StyledTableCell>{materia.professor_nome}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => deleteMateria(materia)}
                      variant="text"
                    >
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

export default MateriasListagem;
