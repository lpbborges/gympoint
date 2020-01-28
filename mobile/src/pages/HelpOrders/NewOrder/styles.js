import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 20px;
`;

export const Form = styled.View`
  margin-top: 20px;
`;

export const QuestionMemo = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(153, 153, 153, 0.7)',
})`
  height: 300px;
  background: #fff;

  font-size: 16px;
  color: #999;

  border-radius: 4px;
  border: 1px solid #ddd;

  padding: 20px;
  margin-bottom: 20px;
`;
