import logo from "../assets/logo.svg";

function Header() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <button>Home</button>
      <button>Empresa</button>
      <button>Projetos</button>
      <button>Tarefas</button>
    </div>
  );
}

export default Header;
