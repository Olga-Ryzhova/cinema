import { Link } from "react-router-dom";

const Authorization = () => {
  return (
    <main>
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>
      <div className="login__wrapper">
        <form className="login__form" action="http://f0769682.xsph.ru/authorization.php" method="POST" acceptCharset="utf-8">
          <label className="login__label" htmlFor="email">
            E-mail
            <input className="login__input" type="email" placeholder="example@domain.xyz" name="email" required/>
          </label>
          <label className="login__label" htmlFor="pwd">
            Пароль
            <input className="login__input" type="password" placeholder="" name="password" required/>
          </label>
          <Link to="/control" className="text-center">
            <input value="Авторизоваться" type="submit" className="login__button"/>
          </Link>
        </form>
      </div>
    </section>
  </main>
  )
}

export default Authorization;