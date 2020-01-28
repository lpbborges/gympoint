import React from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container, PageButton } from './styles';

export default function Pagination({ page, setPage, ...rest }) {
  function handlePages(button) {
    if (button === 'previous') {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  }

  return (
    <Container {...rest}>
      <PageButton
        type="button"
        disabled={page === 1}
        onClick={() => handlePages('previous')}
      >
        <MdKeyboardArrowLeft size={24} color="#fff" />
      </PageButton>
      <PageButton type="button" onClick={() => handlePages('next')}>
        <MdKeyboardArrowRight size={24} color="#fff" />
      </PageButton>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
