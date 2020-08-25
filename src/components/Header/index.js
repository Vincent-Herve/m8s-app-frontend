import React from 'react';
import PropTypes from 'prop-types';
import HeaderStyled from './HeaderStyled';
import Menu from '../../containers/Header/Menu';

const Header = ({ currentPath }) => (
  <HeaderStyled>
    <Menu currentPath={currentPath} />
  </HeaderStyled>
);

Header.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Header;
