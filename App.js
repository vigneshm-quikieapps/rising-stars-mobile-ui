import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import HomeNavigation from './src/Router/Stack/HomeStack';

import { useDispatch, useSelector } from 'react-redux';
import Postcode from './src/screen/Authentication/components/Postcode';
import { getLocalData } from './src/utils/LocalStorage';
import { getmemberData } from './src/redux/action/home';
import SplashScreen from './src/screen/Authentication/SplashScreen';

export default function App() {
  const [isVisible, setVisible] = useState(true)
  const [token, setToken] = useState('')
  const dispatch = useDispatch()

  useEffect(async () => {
    // const accesstoken = await getLocalData('accessToken')
    // dispatch(getmemberData(accesstoken))
    gettoken()
    const Timeout = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(Timeout)
  }, [gettoken])

  const gettoken = async () => {
    const token = await getLocalData('refreshToken')
    setToken(token)
  }

  return (
    <>
      {
        isVisible ? <SplashScreen /> : <HomeNavigation token={token} />
      }
    </>
  )
}