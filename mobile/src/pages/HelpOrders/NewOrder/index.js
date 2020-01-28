import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Form, QuestionMemo } from './styles';

import Background from '~/components/Background';
import Button from '~/components/Button';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.auth.id);

  async function handleSubmit() {
    await api.post(`students/${id}/help-orders`, { question });

    navigation.navigate('HelpOrders');
  }

  return (
    <Background>
      <Container>
        <Form>
          <QuestionMemo
            autoCorrect={false}
            autoCapitalize="none"
            multiline
            textAlignVertical="top"
            maxLength={255}
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="done"
            value={question}
            onChangeText={setQuestion}
          />
          <Button onPress={handleSubmit}>Enviar pedido</Button>
        </Form>
      </Container>
    </Background>
  );
}

NewOrder.navigationOptions = ({ navigation }) => ({
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

NewOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
