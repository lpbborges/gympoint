import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  h1 {
    font-size: 24px;
    color: #444;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    color: #444;

    margin-bottom: 8px;
  }

  input {
    background: #fff;

    padding: 0 15px;

    font-size: 16px;
    color: #666;

    border: 1px solid #ddd;
    border-radius: 4px;

    &::placeholder {
      color: rgba(153, 153, 153, 0.8);
    }

    &:disabled {
      background: #f5f5f5;
    }
  }
`;
