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
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EntIcon from 'react-native-vector-icons/Entypo';

import {PopUp, AppButton, RadioButton} from '../components';
import {colors, Fontsize, wp, hp} from '../constants';
// import {PostDataPass} from '../../../redux/action/auth';

export default function NewPopUpClass(props) {
  //   const dispatch = useDispatch();
  //   const postcodeData = useSelector(state => state.Postcode.postcode);
  const isloading = useSelector(state => state.Postcode.isloading);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  var classData = [];
  var x = props.data;
  memberClassData &&
    x.forEach(item => {
      var flag = 0;
      memberClassData
        ?.filter(item2 => item2?.enrolledStatus === 'ENROLLED')
        .forEach(item1 => {
          if (item._id === item1.classId) {
            flag = 1;
          }
        });
      if (flag === 0) {
        classData.push(item);
      }
    });
  const [selected, setSelected] = useState('');

  // const handlemore = item => {
  //   setShow(item);
  //   setData(!data);
  // };
  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  };
  //   const handledone = () => {
  //     const size = Object.size(selected);
  //     if (size !== 0) {
  //     //   dispatch(PostDataPass(selected, size));
  //       props.onChange && props.onChange;
  //       props.ClosePopUp(false);
  //     } else {
  //       alert('Please Select Your Address or Tap on Manually for manual entry');
  //     }
  //   };
  //   console.log('items', props.data);
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
              <View style={{height: hp('10%')}}>
                <TouchableOpacity onPress={props.ClosePopUp}>
                  <LinearGradient
                    style={styles.closePopUp}
                    colors={['#ffa300', '#ff7e00']}>
                    <EntIcon name="cross" size={15} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
                <View>
                  <Text style={styles.herderstyle}>{props.title}</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: colors.grey,
                    marginBottom: hp('0.1%'),
                  }}
                />
              </View>
              <View style={{height: hp('60%'), marginTop: hp('4%')}}>
                {classData && (
                  <FlatList
                    data={classData}
                    keyExtractor={item => item._id}
                    initialNumToRender={10}
                    renderItem={item => {
                      //   console.log('item', item);
                      return (
                        <View style={styles.postcodeconatiner}>
                          <RadioButton
                            status={
                              selected.name === item.item.name
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => setSelected(item.item)}
                          />
                          <Text style={styles.itemName}>{item.item.name}</Text>
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
                  title="OK"
                  style={{paddingVertical: 12, paddingHorizontal: 40}}
                  onPress={() => {
                    props.setVisibility(false);
                    props.setClub(selected);
                  }}
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
    marginHorizontal: wp('2%'),
    marginVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    // width: wp('88%'),
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
    // width: wp('80%'),
    height: hp('8%'),
    backgroundColor: colors.lightgrey,
    alignItems: 'center',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('2%'),
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
    justifyContent: 'center',
  },
  itemName: {
    marginLeft: wp('5%'),
    fontSize: wp('4%'),
  },
});
