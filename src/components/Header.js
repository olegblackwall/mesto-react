import logo from "../images/Logo-Mesto-Russia.svg"
import { useLocation, Link } from "react-router-dom";
function Header({ email, isLogin, setIsLogin }) {

  const location = useLocation();

  function handleClick() {
    setIsLogin(false);
    localStorage.removeItem("token");
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      {isLogin && <div className="header__info">
        <p className="header__email">{email}</p>
        <button className="header__button" onClick={handleClick}>Выйти</button>
      </div>}
      {!isLogin && location.pathname !== "/sign-in" && <Link className="header__link" to={"/sign-in"}>Войти</Link>}
      {!isLogin && location.pathname !== "/sign-up" && <Link className="header__link" to={"/sign-up"}>Регистрация</Link>}
    </header>
  );
}

export default Header;
