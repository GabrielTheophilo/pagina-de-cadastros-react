import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "../../components/Styles";
import { API_URL_ALUNOS } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";

const CadastrarAlunos = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);

  const valorInicial = id ? "" : null;
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = () => {
    axios.get(API_URL_ALUNOS).then((response) => {
      response.data.forEach((aluno) => {
        if (aluno.id == id) {
          setNome(aluno.nome);
          setIdade(aluno.idade);
          setCidade(aluno.cidade);
        }
      });
    });
  };

  const cadastrarAlunos = () => {
    if (id) {
      axios
        .put(API_URL_ALUNOS, {
          id,
          nome,
          idade,
          cidade,
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
        .post(API_URL_ALUNOS, {
          nome,
          idade,
          cidade,
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
    setNome("");
    setIdade("");
    setCidade("");
  };

  return (
    <Styles.Form>
      <Styles.InputCadastro
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Styles.InputCadastro
        label="Idade"
        variant="outlined"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <Styles.InputCadastro
        label="Cidade"
        variant="outlined"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <Styles.ButtonCadastro onClick={cadastrarAlunos}>
        {id ? "Editar" : "Cadastrar"}
      </Styles.ButtonCadastro>
    </Styles.Form>
  );
};

export default CadastrarAlunos;
