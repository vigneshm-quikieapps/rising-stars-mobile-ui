import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {colors, Images, wp} from '../../Constant/Constant';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBarWithStar from '../../custom/progressBarWithStar';
import TimeLines from '../../custom/Timelines';
import {useDispatch, useSelector} from 'react-redux';
import {GetUserProgress} from '../../redux/action/progAction';

const ActivityProgress = () => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.ProgReducer.progress);
  const Datum = [1, 2, 3, 4];
  const itemWidth = Dimensions.get('window').width;

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        colors={['#ffa300', '#ff7e00']}
        style={{
          width: '100%',
          paddingVertical: 30,
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 20,
          backgroundColor: colors.white,
          borderRadius: 16,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: 'Nunito-Regular',
          }}>
          Class Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          Pre-school gymnastics (Age 1-3)
        </Text>
      </LinearGradient>
    );
  };
  useEffect(() => {
    dispatch(GetUserProgress('614b270bc265630cd55a0520'));
  }, [dispatch]);
  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 34, fontFamily: 'Nunito-SemiBold'}}>
          Progress
        </Text>
      </View>

      <View style={{marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
          Ayman Mogal
        </Text>
        <LinearGradient
          colors={['#ffa300', '#ff7e00']}
          style={{
            marginLeft: 6,
            marginRight: 20,
            height: 32,
            width: 32,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 14, width: 18}}
            source={Images.dropDown_white}
          />
        </LinearGradient>
      </View>

      <View style={{marginTop: 14}}>
        <Carousel
          style={{width: 350}}
          layout={'default'}
          data={progress}
          sliderWidth={itemWidth - 30}
          itemWidth={itemWidth * 0.88}
          renderItem={renderItem}
        />
      </View>
      <View style={{marginTop: 30, marginRight: 20}}>
        <ProgressBarWithStar />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          Start
        </Text>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          In Progress
        </Text>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          Finish
        </Text>
      </View>

      <View style={{marginTop: 10, paddingVertical: 20}}>
        <TimeLines />
      </View>
    </ScrollView>
  );
};

export default ActivityProgress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 20,
  },
});
