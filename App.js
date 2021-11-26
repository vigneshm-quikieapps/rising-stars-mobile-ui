import React, {useEffect, useState, useCallback} from 'react';
import HomeNavigation from './src/Router/Stack/HomeStack';
import {getLocalData} from './src/utils/LocalStorage';
import SplashScreen from './src/screen/Authentication/SplashScreen';

export default function App() {
  const [isVisible, setVisible] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    // const accesstoken = await getLocalData('accessToken')
    // dispatch(getmemberData(accesstoken))
    getToken();
    const Timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(Timeout);
  }, [getToken]);

  const getToken = useCallback(async () => {
    const refreshToken = await getLocalData('refreshToken');
    setToken(refreshToken);
  }, []);

  return isVisible ? <SplashScreen /> : <HomeNavigation token={token} />;
}
