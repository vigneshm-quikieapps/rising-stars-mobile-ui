import * as React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import {Image} from 'react-native';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import {wp, colors} from '../constants';

const ProgressTracker = props => {
  const data = Number((100 / 7) * props.percent);

  return (
    <ProgressCircle
      percent={data}
      radius={wp('14%')}
      borderWidth={wp('2%')}
      color={colors.orange}
      shadowColor={colors.lightgrey}
      bgColor={'white'}>
      {data === 100 ? (
        <Font5Icon name="check" size={40} color={colors.orange} />
      ) : (
        <Image
          source={require('../assets/images/icon-Activity_Progress-star.png')}
          style={{width: wp('12%'), height: wp('12%')}}
        />
      )}
    </ProgressCircle>
  );
};

export default ProgressTracker;
