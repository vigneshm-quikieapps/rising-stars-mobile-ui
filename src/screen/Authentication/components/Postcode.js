/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EntIcon from 'react-native-vector-icons/Entypo';

import {
  PopUp,
  AppButton,
  RadioButton,
  TextInputField,
} from '../../../components';
import {colors, Fontsize, wp, hp} from '../../../constants';
import {PostDataPass} from '../../../redux/action/auth';

export default function PostComponent(props) {
  const dispatch = useDispatch();
  const postcodeData = useSelector(state => state.Postcode.postcode);
  const isloading = useSelector(state => state.Postcode.isloading);
  // const [show, setShow] = useState('');
  // const [data, setData] = useState(false);
  const [selected, setSelected] = useState('');

  // const handlemore = item => {
  //   setShow(item);
  //   setData(!data);
  // };
  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  const handledone = () => {
    const size = Object.size(selected);
    if (size !== 0) {
      dispatch(PostDataPass(selected, size));
      props.ClosePopUp(false);
    } else {
      alert('Please Select Your Address or Tap on Manually for manual entry');
    }
  };

  return (
    <>
      {isloading ? (
        <ActivityIndicator size="large" color={colors.orange} />
      ) : (
        <PopUp
          animationType="slide"
          transparent={true}
          visible={props.visible}
          setVisibility={bin => props.ClosePopUp(bin)}
          onRequestClose={() => {}}>
          <View
            style={[
              styles.container,
              {
                borderColor: isloading ? 'white' : colors.orange,
                backgroundColor: isloading ? null : 'white',
                borderWidth: isloading ? 0 : 1,
              },
            ]}>
            <View>
              <View style={{height: hp('20%')}}>
                <TouchableOpacity onPress={props.ClosePopUp}>
                  <LinearGradient
                    style={styles.closePopUp}
                    colors={['#ffa300', '#ff7e00']}>
                    <EntIcon name="cross" size={15} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
                <View>
                  <Text style={styles.herderstyle}>Search Address</Text>
                  <TextInputField
                    placeholder={'Postcode'}
                    borderColor={'#e3e3e3'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={false}
                    value={props.title}
                  />
                  <Text style={styles.subtitle}>Available Address</Text>
                  {/* <Text style={styles.title}>
                    Your PostCode{' '}
                    <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
                  </Text> */}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: colors.lightgrey,
                    marginBottom: hp('0.1%'),
                  }}
                />
              </View>
              <View style={{height: hp('60%'), marginTop: hp('2%')}}>
                {props.data && postcodeData.length > 0 && (
                  <FlatList
                    data={props.data}
                    keyExtractor={item => item.addressline1}
                    initialNumToRender={10}
                    renderItem={item => {
                      return (
                        <View style={styles.postcodeconatiner}>
                          <RadioButton
                            status={
                              selected.addressline1 ===
                                item.item.addressline1 && 'checked'
                            }
                            onPress={() => setSelected(item.item)}
                          />
                          <View
                            style={{width: wp('90%'), marginLeft: wp('2%')}}>
                            <Text style={styles.head} ellipsizeMode="head">
                              {item.item.organisation}
                            </Text>
                            <Text
                              style={styles.body}
                              // numberOfLines={
                              //   show === item.item.addressline1 && data ? 1 : 1
                              // }
                              // ellipsizeMode="tail"
                            >
                              {item.item.addressline1}
                              {item.item.addressline2}
                            </Text>
                            {/* <Text
                              onPress={() => handlemore(item.item.addressline1)}
                              style={{
                                marginRight: wp('10%'),
                                alignSelf: 'flex-end',
                                fontSize: wp('2.5%'),
                                color: colors.orange,
                                textDecorationLine: 'underline',
                              }}>
                              {show === item.item.addressline1 && data
                                ? 'Less info'
                                : 'More info'}
                            </Text> */}
                          </View>
                        </View>
                      );
                    }}
                  />
                )}
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightgrey,
                  }}
                />
              </View>
              <View style={styles.bottomView}>
                <AppButton
                  title="Enter Manually"
                  style={{paddingVertical: 12}}
                  onPress={props.ManuallyButton}
                />
                <AppButton
                  title="OK"
                  style={{paddingVertical: 12, marginVertical: 0}}
                  onPress={handledone}
                />
              </View>
            </View>
          </View>
        </PopUp>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: wp('7%'),
    marginVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    width: wp('88%'),
    borderBottomWidth: 2,
    borderColor: colors.lightgrey,
    //marginBottom: hp('10%'),
    //paddingBottom: hp('10%'),
  },
  subtitle: {
    color: '#8a8787',
    marginTop: wp('1%'),
    marginBottom: wp('1%'),
  },
  postcodeconatiner: {
    flexDirection: 'row',
    marginVertical: hp('0.5%'),
    width: wp('80%'),
    height: hp('15%'),
    backgroundColor: colors.lightgrey,
    alignItems: 'center',
    borderRadius: wp('5%'),
  },
  head: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize + wp('0.5%'),
    fontWeight: 'bold',
  },
  herderstyle: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize + wp('1%'),
    fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Nunito-Regular',
    width: wp('65%'),
  },
  title: {
    fontFamily: 'Nunito-Regular',
  },
  closePopUp: {
    height: hp('3%'),
    width: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginTop: -hp('1%'),
  },
  bottomView: {
    margin: 0,
    flexDirection: 'row',
    height: hp('10%'),
    justifyContent: 'space-between',
  },
});
