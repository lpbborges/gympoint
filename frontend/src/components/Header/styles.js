import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(221, 221, 221, 0.5);
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;

  nav {
    height: 32px;
    display: flex;
    align-items: center;

    label {
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 15px;
      color: #ee4d64;
      border-right: 1px solid #dddddd;
      margin-right: 30px;
      margin-bottom: 0;
      padding-right: 30px;

      img {
        height: 24px;
        width: 48px;
        margin-right: 10px;
      }
    }

    ul {
      display: flex;
      align-items: center;

      li a.active {
        color: #444;
      }

      li a {
        color: #999;
        font-size: 15px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 14px;
      color: #666;
    }

    button {
      background: none;
      border: none;
      padding: 0;
      font-size: 14px;
      color: #de3b3b;
      align-self: flex-end;

      transition: color 0.2s;

      &:hover {
        color: ${darken(0.06, '#de3b3b')};
      }
    }
  }
`;
