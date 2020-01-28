import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { Container, Form, TextInput, Text, SubmitButton } from './styles';

import { signRequest } from '~/store/modules/auth/actions';

export default function Sign() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Text>GYMPOINT</Text>
      <Form>
        <TextInput
          keyboardType="number-pad"
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
