import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "../../components/Styles";
import { API_URL_MATERIA } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";

const CadastrarMaterias = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);

  const valorInicial = id ? "" : null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [professor_nome, setProfessor] = useState(valorInicial);

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URL_MATERIA).then((response) => {
      response.data.forEach((materia) => {
        if (materia.id == id) {
          setTitulo(materia.titulo);
          setProfessor(materia.professor);
        }
      });
    });
  };

  const cadastrarMaterias = () => {
    if (id) {
      axios
        .put(API_URL_MATERIA, {
          id,
          titulo,
          professor_nome,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    } else {
      axios
        .post(API_URL_MATERIA, {
          titulo,
          professor_nome,
        })
        .then((response) => {
          if (response.status === 201) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    }
  };

  const limparCampos = () => {
    setTitulo("");
    setProfessor("");
  };

  return (
    <Styles.Form>
      <Styles.InputCadastro
        label="Titulo"
        variant="outlined"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Styles.InputCadastro
        label="Professor"
        variant="outlined"
        value={professor_nome}
        onChange={(e) => setProfessor(e.target.value)}
      />

      <Styles.ButtonCadastro onClick={cadastrarMaterias}>
        {id ? "Editar" : "Cadastrar"}
      </Styles.ButtonCadastro>
    </Styles.Form>
  );
};

export default CadastrarMaterias;
