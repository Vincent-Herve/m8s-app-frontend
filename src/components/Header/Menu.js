import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ isLogged, handleSignout, currentPath }) => {
  const Signout = () => {
    handleSignout();
  };
  return (
    <Navbar className="nav transparent" fixed="top" expand="lg">
      {/* <Navbar.Brand href="/" className="logo">M8S</Navbar.Brand> */}
      <NavLink className="logo" exact to="/">M8S</NavLink>
      <Navbar.Toggle className="burger" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className={currentPath === '/' ? 'currentPath' : ''} exact to="/">Accueil</NavLink>
          <NavLink className={currentPath === '/activity' ? 'currentPath' : ''} exact to="/activity">Activités</NavLink>
          {isLogged && (
            <>
              <NavLink className={currentPath === '/profil' ? 'currentPath' : ''} exact to="/profil">Mon profil</NavLink>
              <NavLink onClick={Signout} exact to="/">Se déconnecter</NavLink>
            </>
          )}
          {!isLogged && (
            <>
              <NavLink className={currentPath === '/signin' ? 'currentPath' : ''} exact to="/signin">Connexion</NavLink>
              <NavLink className={currentPath === '/signup' ? 'currentPath' : ''} exact to="/signup">Inscription</NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Menu.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  handleSignout: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Menu;
