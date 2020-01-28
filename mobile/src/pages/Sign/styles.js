import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #fff;

  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;

export const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ee4d64;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const TextInput = styled.TextInput`
  background: #fff;

  font-size: 16px;
  color: #999;
  padding: 13px 20px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
