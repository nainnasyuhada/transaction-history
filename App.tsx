import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '@components/auth/AuthScreen';
import HistoryScreen from '@components/transaction/HistoryScreen';
import DetailsScreen from '@components/transaction/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
