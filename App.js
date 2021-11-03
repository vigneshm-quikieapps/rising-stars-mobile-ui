import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import HomeNavigation from './src/Router/Stack/HomeStack';

import { useDispatch, useSelector } from 'react-redux';
import Postcode from './src/screen/Authentication/components/Postcode';
import { getLocalData } from './src/utils/LocalStorage';
import { getmemberData } from './src/redux/action/home';

export default function App() {

  const dispatch = useDispatch()
  useEffect(async () => {
    const accesstoken = await getLocalData('accessToken')
    dispatch(getmemberData(accesstoken))
  }, [])

  return (
    <HomeNavigation />
  )
}