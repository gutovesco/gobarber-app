import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList, ProvidersListTitle, ProviderContainer, ProviderAvatar, ProviderInfo, ProviderName, ProviderMeta, ProviderMetaText} from './styles'
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather'

export interface Provider{
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const {navigate} = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    //navigate('Profile');
    signOut()
  }, [signOut])

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', {providerId});
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem-vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}}></UserAvatar>
        </ProfileButton>
      </Header>

      <ProvidersList data={providers} keyExtractor={(provider) => provider.id}
      ListHeaderComponent={
        <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
      }
      renderItem={({item}) => (
        <ProviderContainer onPress={() => navigateToCreateAppointment(item.id)}>
          <ProviderAvatar source={{uri: item.avatar_url}}></ProviderAvatar>

          <ProviderInfo>
            <ProviderName>{item.name}</ProviderName>

            <ProviderMeta>
              <Icon name="calendar" size={14} color="#ff9000"/>
              <ProviderMetaText>Segudna à sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
              <Icon name="clock" size={14} color="#ff9000"/>
              <ProviderMetaText>8h às 18h</ProviderMetaText>
            </ProviderMeta>

          </ProviderInfo>
        </ProviderContainer>
      )}
      ></ProvidersList>
    </Container>
  );
};

export default Dashboard;
