import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/public/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import Signin from '../screens/public/signin/SignIn';
import {RickAndMorty} from '../screens/private/RickAndMorty';
import Details from '../screens/private/Details';
const Stack = createStackNavigator();

const GlobalNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="RAM" component={RickAndMorty} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default GlobalNavigation;
