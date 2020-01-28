import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  NewOrderButton,
  List,
  Content,
  HeaderOrder,
  Status,
  TextStatus,
  Time,
  Text,
} from './styles';

import Background from '~/components/Background';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const id = useSelector(state => state.auth.id);

  async function loadHelpOrders(student_id) {
    const response = await api.get(`students/${student_id}/help-orders`);

    const data = response.data.map(helpOrder => {
      const dateFormated = formatRelative(
        helpOrder.answer
          ? parseISO(helpOrder.answer_at)
          : parseISO(helpOrder.created_at),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      );

      return {
        ...helpOrder,
        dateFormated,
      };
    });

    setHelpOrders(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(id);
    }
  }, [id, isFocused]);

  return (
    <Background>
      <Container>
        <NewOrderButton onPress={() => navigation.navigate('NewOrder')}>
          Novo pedido de auxílio
        </NewOrderButton>
        <List
          data={helpOrders}
          keyExtractor={helpOrder => String(helpOrder.id)}
          renderItem={({ item: helpOrder }) => (
            <Content
              onPress={() => navigation.navigate('Answer', { helpOrder })}
            >
              <HeaderOrder>
                <Status>
                  <Icon
                    name="check-circle"
                    size={16}
                    color={helpOrder.answer ? '#42CB59' : '#999'}
                  />
                  <TextStatus answered={!!helpOrder.answer}>
                    {helpOrder.answer ? 'Respondido' : 'Sem resposta'}
                  </TextStatus>
                </Status>
                <Time>{helpOrder.dateFormated}</Time>
              </HeaderOrder>
              <Text>{helpOrder.question}</Text>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);

HelpOrders.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
