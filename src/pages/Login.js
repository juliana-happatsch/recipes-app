import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import { addEmail } from '../redux/actions';
import '../styles/login.css';
import chef from '../images/chefBranco.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    alert('Por favor, visualize em 360x640');
  }, []);

  useEffect(() => {
    const checkEmail = () => {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const length = 6;

      if (email.match(validEmail) && password.length > length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    checkEmail();
  }, [password, email]);

  function handleClick() {
    const emailLS = { email };
    const stringifyEmailLS = JSON.stringify(emailLS);

    window.localStorage.mealsToken = 1;
    window.localStorage.cocktailsToken = 1;
    window.localStorage.user = stringifyEmailLS;

    history.push('/comidas');
    dispatch(addEmail(email));
  }

  return (
    <div className="body d-flex j-c-center a-i-center f-d-column login-page">
      <img src={ chef } alt="logo de um chef de cozinha" className="chef-logo" />
      <h1 className="login-title">Whatever Recipes</h1>
      <form className="d-flex f-d-column a-i-stretch">
        <Input
          type="email"
          data-testid="email-input"
          id="email"
          name="email"
          setValue={ setEmail }
          placeHolder="Email"
          className="m-1 p-1 login-input"
        />
        <Input
          type="password"
          data-testid="password-input"
          id="password"
          name="password"
          setValue={ setPassword }
          placeHolder="Senha"
          className="m-1 p-1 login-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleClick }
          className="m-1 login-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
