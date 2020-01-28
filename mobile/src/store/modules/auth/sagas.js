import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signSuccess, signFailure } from './actions';

export function* sign({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `students/${id}`);

    const { data } = response;

    if (!data) {
      Alert.alert('ID não encontrado', 'Não existe aluno com o ID informado!');
    }

    yield put(signSuccess(data.id));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro na autenticação, tente novamente mais tarde'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_REQUEST', sign)]);
