import React, { useCallback, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText } from './styles'
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
  const [showDatePicker, setShowDatePicker] = useState(true)

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

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(true)
    console.log(showDatePicker)
  }, [setShowDatePicker])

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

      <Calendar>
        <Title>Escolha a data</Title>
        <OpenDatePickerButton onPress={() => setShowDatePicker(true)}>
          <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
        </OpenDatePickerButton>
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          is24Hour={true}
          display="default"
        />
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
