import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Header = styled.View`
  height: 44px;
  background: #fff;

  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const CheckinButton = styled(Button)`
  margin: 20px 0 20px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})``;

export const Content = styled.View`
  height: 46px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 20px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Id = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #666;
  max-width: 55%;
`;
