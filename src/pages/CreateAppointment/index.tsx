import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {Platform} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
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
  OpenDatePickerButtonText
} from './styles'
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem{
   hour: number;
   available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation()
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState(providerId)
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    goBack()
  }, [])

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id)
  }, [])

  const toggleDateTimePicker = useCallback(() => {
    setShowDateTimePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if(Platform.OS === 'android'){
      setShowDateTimePicker(false)
    }

    if(date){
      setSelectedDate(date)
    }
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

      <Calendar>
        <Title>Escolha a data</Title>
        <OpenDatePickerButton onPress={toggleDateTimePicker}>
          <OpenDatePickerButtonText>Abrir o calendario</OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showDateTimePicker && (<DateTimePicker mode="date" onChange={() => handleDateChanged} value={selectedDate} display="calendar" textColor="#f4ede8"/>)}
      </Calendar>

    </Container>
  );
};

export default CreateAppointment;

