import React from 'react';
import { View, Text } from 'react-native'
import HomeNavigation from './src/Router/Stack/HomeStack';
import { store } from './src/redux/configureStore';
import { Provider } from 'react-redux';

export default function App() {
  return (
 
      <HomeNavigation />

  )
}