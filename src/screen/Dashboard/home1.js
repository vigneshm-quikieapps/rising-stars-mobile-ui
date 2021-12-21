import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  WheelDropdown,
  ProgressBarWithStar,
  Timelines,
  BarIndicator,
  AttendanceCard,
  ClassCard,
} from '../../components';

import {colors, Fontsize, hp, Images, wp} from '../../constants';
import {getLocalData} from '../../utils/LocalStorage';
import {getmemberClass} from '../../redux/action/home';

const Home = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [memberIndex, setMemberIndex] = useState(0);

  const membersdata = useSelector(state => state.memberData.memberData);
  const memberclassdata = useSelector(state => state.memberClassData.classData);

  membersdata && membersdata.forEach((item, index) => (item.index = index));

  useEffect(() => {
    getLocalUserData();
  }, [getLocalUserData]);

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);
};

return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.white}}>
          <StatusBar backgroundColor="rgb(255,163,0)" />
          
