import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const NewOrderButton = styled(Button)`
  margin: 20px 0 20px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})``;

export const Content = styled.TouchableOpacity`
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const HeaderOrder = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextStatus = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #666;
  max-width: 50%;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;
