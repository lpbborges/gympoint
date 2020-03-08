import styled from 'styled-components';
import { darken } from 'polished';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 970px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    aside {
      display: flex;
      align-items: center;
    }
  }

  form {
    margin-top: 20px;
    padding: 30px;

    background: #fff;
    border-radius: 4px;

    label {
      display: block;
    }

    div.input-line {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      margin-top: 20px;

      div.select {
        flex: 1;
        margin-right: 10px;
        display: block;
      }

      div.input-form + div.input-form {
        margin-left: 10px;

        input {
          height: 42px;
        }
      }
    }

    .react-datepicker-wrapper input {
      color: #666;
      height: 45px;
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
