import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Wrapper, Content, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Wrapper>
      <Content>
        <label htmlFor="logo">
          <img id="logo" src={logo} alt="gympoint" />
          GYMPOINT
        </label>

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input
            name="email"
            label="SEU E-MAIL"
            type="email"
            placeholder="Seu e-mail"
          />
          <Input
            name="password"
            label="SUA SENHA"
            type="password"
            placeholder="Sua senha secreta"
          />
          <SubmitButton loading={loading} type="submit">
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Content>
    </Wrapper>
  );
}
