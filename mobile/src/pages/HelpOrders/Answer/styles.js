import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const Content = styled.View`
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #666;
  max-width: 60%;
`;

export const Text = styled.Text`
  font-size: 14px;
  text-align: justify;
  color: #666;
  line-height: 26px;
  margin-top: 8px;
`;

export const AnswerContent = styled.View`
  margin-top: 20px;
`;
