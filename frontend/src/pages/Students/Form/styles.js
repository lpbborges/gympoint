import styled from 'styled-components';
import { darken } from 'polished';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 970px;
  margin: 0 auto;
  padding: 0 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    aside {
      display: flex;
      align-items: center;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    margin-top: 20px;
    padding: 30px;

    background: #fff;
    border-radius: 4px;

    label:first-child {
      margin-top: 0;
    }

    > label {
      margin-top: 20px;
    }

    input {
      height: 45px;
    }

    span {
      color: #ee4d64;
      font-weight: bold;
      align-self: flex-start;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 20px;

      div + div {
        margin-left: 15px;
      }

      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const BackButton = styled(Button)`
  background: #ddd;
  margin-right: 16px;

  &:hover {
    background: ${darken(0.04, '#ddd')};
  }
`;
