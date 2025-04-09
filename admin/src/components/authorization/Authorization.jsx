import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'admin123') {
      setIsAuthenticated(true); 
      setErrorMessage(''); 
      navigate('/control'); 
    } else {
      setErrorMessage('Неверный логин или пароль');
      setIsAuthenticated(false);
    }
  };

  return (
    <main>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
        <div className="login__wrapper">
          <form className="login__form" onSubmit={handleSubmit} acceptCharset="utf-8">
            <label className="login__label" htmlFor="email">
              E-mail
              <input
                className="login__input"
                type="email"
                placeholder="example@domain.xyz"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login__label" htmlFor="pwd">
              Пароль
              <input
                className="login__input"
                type="password"
                placeholder=""
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <input value="Авторизоваться" type="submit" className="login__button" />
          </form>

          {isAuthenticated && (
            <div className="success-message">
              <p>Авторизация успешна!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Authorization;
