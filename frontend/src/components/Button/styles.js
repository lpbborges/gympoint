import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  height: 36px;
  background: #ee4d64;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  font-size: 14px;
  font-weight: bold;
  color: #fff;

  border: 0;
  border-radius: 4px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  transition: background 0.2s;

  &:hover {
    background: ${darken(0.06, '#ee4d64')};
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

  svg {
    margin-right: 8px;
  }
`;
