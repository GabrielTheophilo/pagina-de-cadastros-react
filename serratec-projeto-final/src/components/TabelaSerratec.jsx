import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../pages/alunos/styles";

const TabelaSerratec = ({listaCampos, listaValores}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {listaCampos?.map((campo) => (
              <StyledTableCell>{campo}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listaValores?.map((valor) => (
            <StyledTableRow>
              {listaCampos.map((campo) => (
                <StyledTableCell>{valor[campo]}</StyledTableCell>
              ))}
              {/* <StyledTableCell>
                <Button onClick={() => deletarAluno(aluno)} variant="text">
                  <DeleteIcon />
                </Button>
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaSerratec;
