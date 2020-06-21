import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth';
import { Container, Header, BackButton, HeaderTitle, UserAvatar, ProvidersListContainer, ProvidersList, ProviderContainer, ProviderAvatar, ProviderName } from './styles'
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation()
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(providerId)

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [])

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }}></UserAvatar>
      </Header>

      <ProvidersListContainer>
        <ProvidersList data={providers} keyExtractor={provider => provider.id} horizontal showsHorizontalScrollIndicator={false}
          renderItem={({ item: provider }) => (
            <ProviderContainer onPress={() => handleSelectProvider(provider.id)} selected={provider.id === selectedProvider}>
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName>{provider.name}</ProviderName>
            </ProviderContainer>
          )} />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
