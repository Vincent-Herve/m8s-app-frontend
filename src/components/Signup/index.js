/* eslint-disable newline-per-chained-call */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PasswordValidator from 'password-validator';
import ClipLoader from 'react-spinners/ClipLoader';
import SignupStyled from './SignupStyled';
import Field from './Field';

const Signup = ({
  handleSignup,
  username,
  firstname,
  lastname,
  email,
  password,
  passwordConfirm,
  isLoading,
  changeField,
  messageError,
  setMessageError,
}) => {
  useEffect(() => {
    document.title = 'S\'inscrire';
  }, []);

  // Create a schema
  const schema = new PasswordValidator();

  // Add properties to it
  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username === '' || firstname === '' || lastname === '' || email === '' || password === '' || passwordConfirm === '') {
      setMessageError('Veuillez remplir tout les champs');
    }
    else if (password !== passwordConfirm) {
      setMessageError('Mots de passe non identique');
    }
    else if (!schema.validate(password)) {
      setMessageError('Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un caractère spécial, un chiffre et pas d\'espace');
    }
    else {
      setMessageError('');
      handleSignup();
    }
  };

  return (
    <SignupStyled>
      <section className="signup">

        <h1>Inscription</h1>

        <form className="login-form-element" onSubmit={handleSubmit}>
          <Field
            name="username"
            placeholder="Pseudo"
            onChange={changeField}
            value={username}
          />
          <Field
            name="firstname"
            placeholder="Prénom"
            onChange={changeField}
            value={firstname}
          />
          <Field
            name="lastname"
            placeholder="Nom"
            onChange={changeField}
            value={lastname}
          />
          <Field
            name="email"
            placeholder="Adresse Email"
            onChange={changeField}
            value={email}
          />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            onChange={changeField}
            value={password}
          />
          <Field
            name="passwordConfirm"
            placeholder="Confirmer password"
            type="password"
            onChange={changeField}
            value={passwordConfirm}
          />
          <button
            type="submit"
            className="login-form-button"
          >
            Valider
          </button>
        </form>
        <p className="error">{messageError}</p>
        <ClipLoader
          css="loading"
          size={100}
          color="orange"
          loading={isLoading}
        />
        <div className="contain-links">
          <Link className="links" to="/signin"> Déjà un compte ? Se connecter</Link>
        </div>
      </section>

    </SignupStyled>

  );
};
Signup.propTypes = {
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  messageError: PropTypes.string.isRequired,
  setMessageError: PropTypes.func.isRequired,
};

export default Signup;
