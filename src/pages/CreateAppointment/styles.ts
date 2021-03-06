import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Provider } from './index'

interface ProviderContainerProps{
  selected: boolean;
}

export const Container = styled.View`
flex: 1;
`;

export const Header = styled.View`
padding: 24px;
background: #28262e;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
color: #f5ede8;
font-family: 'RobotSlab-Medium';
font-size: 20px;
margin-left: 16px;
`;

export const UserAvatar = styled.Image`
width: 56px;
height: 56px;
border-radius: 28px;
margin-left: auto;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
  `;

export const ProvidersListContainer = styled.View`
height: 112px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
flex-direction: row;
align-items: center;
padding: 8px 12px;
margin-right: 16px;
border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
width: 32px;
height: 32px;
border-radius: 16px;
`;

export const ProviderName = styled.Text`
margin-left: 8px;
font-family: 'RobotoSlab-Medium';
font-size: 16px;
color: #f4ede8;
`;

export const Title = styled.Text`
font-family: 'RoboSlab-Medium';
color: #f4ede8;
font-size: 24px;
margin: 0 24px 24px;
`;

export const Calendar = styled.View``;

export const OpenDatePickerButton = styled(RectButton)`
height: 46px;
background: #ff9000;
border-radius: 10px;
align-items: center;
margin: 0 24px;
justify-content: center;
`;

export const OpenDatePickerButtonText= styled.Text`
font-size: 16px;
color: #f4ede8;
`;
