/**
 * 
 */

import React from 'react';
import { Alert } from 'react-native';


import Hoteles from './src/component/hotelesView/hoteles';
import DetalleHoteles from './src/component/detalleHotelView/detalleHotel';

import { Container, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';


const RootStack = createStackNavigator(
  {
    Hoteles: Hoteles,
    Detalle: DetalleHoteles,
  },
  {
    initialRouteName: 'Hoteles',
    
    // Personalizacion de la barra superrior

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: <Icon onPress={() => Alert.alert('¡Todo esta bien!', 'De momento no tienes ninguna notificacion')} name='bell' size={30} style = {{color: 'white', marginRight: 20}} />
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Container style = {{backgroundColor:'#efefef'}}>
        <AppContainer></AppContainer>
      </Container>
    );
  }
}