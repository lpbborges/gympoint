import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 970px;
  margin: 0 auto;
  padding: 0 30px;

  header {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const Table = styled.table`
  flex: 1;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;

  thead th:nth-child(1) {
    width: 35%;
  }

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 30%;
    text-align: center;
  }

  thead th:nth-child(3),
  tbody td:nth-child(3) {
    text-align: center;
  }

  tbody td:nth-child(4) {
    display: flex;
    justify-content: flex-end;
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
    font-size: 16px;
    color: #666;
    padding: 16px 0;

    a {
      font-size: 15px;
      color: #4d85ee;
      margin-right: 23px;

      transition: color 0.2s;

      &:hover {
        color: ${darken(0.06, '#4d85ee')};
      }
    }

    button {
      font-size: 15px;
      border: 0;
      background: none;
      color: #de3b3b;

      transition: color 0.2s;

      &:hover {
        color: ${darken(0.06, '#de3b3b')};
      }
    }
  }
`;
