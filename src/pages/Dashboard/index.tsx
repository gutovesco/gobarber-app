import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList} from './styles'
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

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
      renderItem={({item}) => (
        <UserName>{item.name}</UserName>
      )}
      ></ProvidersList>
    </Container>
  );
};

export default Dashboard;
