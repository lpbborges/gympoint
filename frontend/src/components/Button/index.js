import React from 'react';
import PropTypes from 'prop-types';

import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? <FaSpinner size={20} color="#fff" /> : children}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
