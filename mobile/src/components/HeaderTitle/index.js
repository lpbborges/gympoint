import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo-header.png';

import { Container, Title } from './styles';

export default function HeaderTitle() {
  return (
    <Container>
      <Image source={logo} color="#ee4e62" />
      <Title>GYMPOINT</Title>
    </Container>
  );
}
