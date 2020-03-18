import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const PageButton = styled.button`
  display: flex;
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  border: 0;

  background: transparent;
`;

export const Pages = styled.button`
  border: 0;
  background: transparent;
  text-align: center;
  color: ${props => (props.currentPage ? '#ee4d64' : '#999')};
  font-size: 18px;
  font-weight: bold;
  padding: 4px;
`;
