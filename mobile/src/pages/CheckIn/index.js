import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, CheckinButton, List, Content, Id, Time } from './styles';

function CheckIn({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.id);

  async function loadCheckins(student_id) {
    const response = await api.get(`students/${student_id}/checkins`);

    const data = response.data.map((checkin, index, array) => {
      const number = array.length - index;
      const dateParsed = formatRelative(
        parseISO(checkin.created_at),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      );

      return {
        ...checkin,
        number,
        dateParsed,
      };
    });

    setCheckins(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins(id);
    }
  }, [id, isFocused]);

  async function handleNewCheckIn() {
    try {
      setLoading(true);
      await api.post(`students/${id}/checkins`);

      Alert.alert('Confirmação', 'Check-in efetuado!');

      loadCheckins(id);
    } catch (err) {
      setLoading(false);

      Alert.alert(
        'Erro',
        'Você pode fazer apenas cinco check-ins consecutivos em um período de sete dias'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <CheckinButton loadin={loading} onPress={handleNewCheckIn}>
          Novo check-in
        </CheckinButton>
        <List
          data={checkins}
          keyExtractor={checkin => String(checkin.id)}
          renderItem={({ item }) => (
            <Content>
              <Id>Check-in #{item.number}</Id>
              <Time>{item.dateParsed}</Time>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(CheckIn);

CheckIn.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
