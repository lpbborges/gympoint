import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const PageButton = styled(Button)`
  width: 36px;
  padding: 0;
  margin: 0 8px;

  svg {
    margin: 0;
  }
`;
