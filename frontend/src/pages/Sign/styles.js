import styled from 'styled-components';

import Button from '~/components/Button';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  background: #fff;
  border-radius: 4px;
  padding: 50px 30px;

  > label {
    display: flex;
    flex-direction: column;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0;
    color: #ee4d64;

    img {
      margin-bottom: 10px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    margin-top: 30px;

    input {
      height: 45px;
      color: #999;
    }

    input + label {
      margin-top: 20px;
    }

    span {
      color: #ee4d64;
      font-weight: bold;
      text-align: left;
      margin-bottom: 5px;
    }
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  height: 45px;
  font-size: 16px;
`;
