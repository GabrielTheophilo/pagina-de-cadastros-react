import { useContext, useState } from "react";
import Styles from "../components/Styles";
import { UsuarioContext } from "../context";

const Login = () => {
  const [usuarioInput, setUsuarioInput] = useState();
  const [senha, setSenha] = useState();
  const { setUsuario } = useContext(UsuarioContext);

  const efetuarLogin = () => {
    // axios.post(URLLOGIN, {usuario, senha})
    setUsuario(usuarioInput);
    localStorage.setItem('usuarioLogado', usuarioInput);
  }

  return (
    <Styles.Form>
      <Styles.InputCadastro
        label="Usuário"
        variant="outlined"
        value={usuarioInput}
        onChange={(e) => setUsuarioInput(e.target.value)}
      />
      <Styles.InputCadastro
        label="Senha"
        variant="outlined"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Styles.ButtonCadastro onClick={() => { efetuarLogin() }}>
        Logar
      </Styles.ButtonCadastro>
    </Styles.Form>
  );
};

export default Login;