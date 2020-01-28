import styled from 'styled-components';
import { darken } from 'polished';

import { Form } from '@rocketseat/unform';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 770px;
  margin: 0 auto;
  padding: 0 30px;

  header {
    margin-top: 30px;
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Table = styled.table`
  flex: 1;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 10%;
    text-align: right;
  }

  thead th {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    color: #444;
  }

  tr {
    & + tr {
      border-top: 1px solid #eee;
    }
  }

  tbody td {
    padding: 16px 0;
    font-size: 16px;
    color: #666;

    button {
      font-size: 15px;
      border: 0;
      background: none;
      color: #4d85ee;

      transition: color 0.2s;

      &:hover {
        color: ${darken(0.06, '#4d85ee')};
      }
    }
  }
`;

export const BackgroundModal = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;

  z-index: 3;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
`;

export const ContainerModal = styled.div`
  max-width: 450px;
  height: 425px;
  margin: 200px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

export const HeaderModal = styled.div`
  width: 100%;
  padding: 5px;
  text-align: right;

  button {
    border: 0;
    padding: 0;
    background: none;
  }
`;

export const FormModal = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 30px 30px 30px;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #444;
    margin-bottom: 8px;
    text-align: left;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 22px;
    margin-bottom: 20px;
  }

  textarea {
    height: 127px;
    padding: 13px 15px;
    resize: none;

    font-size: 16px;
    color: #999;

    border: 1px solid #ddd;
    margin-bottom: 21px;
    border-radius: 4px;
  }

  button {
    justify-self: flex-end;
  }
`;

export const SubmitButton = styled(Button)`
  height: 45px;
  font-size: 16px;
`;
