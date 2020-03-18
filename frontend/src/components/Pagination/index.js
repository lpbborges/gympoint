import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

import { Container, PageButton, Pages } from './styles';

export default function Pagination({ page, count, setPage, ...rest }) {
  const pageCount = useMemo(() => {
    return Math.ceil(count / 10);
  }, [count]);

  const pages = useMemo(() => {
    const value = Array.from(new Array(pageCount), (_, k) => k + 1);

    if (page < 3) {
      return value.slice(0, 5);
    }

    if (pageCount - page < 3) {
      return value.slice(-5);
    }

    return value.slice(page - 3, page + 2);
  }, [page, pageCount]);

  const showFirst = useMemo(() => {
    return page > 3;
  }, [page]);

  const showNext = useMemo(() => {
    return pageCount - page > 0;
  }, [page, pageCount]);

  const showLast = useMemo(() => {
    return pageCount - page > 2;
  }, [page, pageCount]);

  const showPages = useMemo(() => {
    return pages.length !== 1;
  }, [pages.length]);

  const showPagination = useMemo(() => {
    return count > 10;
  }, [count]);

  const showPrevious = useMemo(() => {
    return page > 1;
  }, [page]);

  return (
    <Container {...rest} show={showPagination}>
      <PageButton type="button" show={showFirst} onClick={() => setPage(1)}>
        <FaAngleDoubleLeft size={24} color="#ee4d64" />
      </PageButton>
      <PageButton
        type="button"
        show={showPrevious}
        onClick={() => setPage(page - 1)}
      >
        <FaAngleLeft size={24} color="#ee4d64" />
      </PageButton>
      {showPages
        ? pages.map(p => (
            <Pages key={p} currentPage={p === page} onClick={() => setPage(p)}>
              {p}
            </Pages>
          ))
        : null}
      <PageButton
        type="button"
        show={showNext}
        onClick={() => setPage(page + 1)}
      >
        <FaAngleRight size={24} color="#ee4d64" />
      </PageButton>
      <PageButton
        type="button"
        show={showLast}
        onClick={() => setPage(pages.length)}
      >
        <FaAngleDoubleRight size={24} color="#ee4d64" />
      </PageButton>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
