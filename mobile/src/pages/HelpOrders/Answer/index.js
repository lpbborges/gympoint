import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Header,
  Title,
  Time,
  Text,
  AnswerContent,
} from './styles';

import Background from '~/components/Background';

export default function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Background>
      <Container>
        <Content>
          <Header>
            <Title>PERGUNTA</Title>
            <Time>{helpOrder.dateFormated}</Time>
          </Header>
          <Text>{helpOrder.question}</Text>
          <AnswerContent>
            <Title>RESPOSTA</Title>
            <Text>{helpOrder.answer ? helpOrder.answer : ''}</Text>
          </AnswerContent>
        </Content>
      </Container>
    </Background>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrders');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

Answer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
