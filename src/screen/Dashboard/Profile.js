/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {getLocalData} from '../../utils/LocalStorage';
import {useDispatch, useSelector} from 'react-redux';

import RBSheet from 'react-native-raw-bottom-sheet';

import {removeLocalData} from '../../utils/LocalStorage';
import {CustomLayout} from '../../components';
import {colors, hp, wp} from '../../constants';
import {getmemberClass} from '../../redux/action/home';
import * as Action from '../../redux/action-types/index';
import {fetchCurrentUser} from '../../redux/service/request';
import {FlatList} from 'react-native-gesture-handler';

function Profile(props) {
  const membersdata = useSelector(state => state.memberData.memberData);
  //const memberclassdata = useSelector(state => state.memberClassData.classData);
  const parent = useSelector(state => state.LoginData.updatedUser);

  // let steps = false;
  const refRBSheet = useRef();
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const dispatch = useDispatch();

  const currentMember = useSelector(state => state.currentMemberData.data);

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  // const accessToken = async () => {
  //   const Token = await getLocalData('accessToken');
  //   setToken(Token);
  // };

  const [fileUri, setfileUri] = useState(null);

  const updateProfilePicture = () => {
    refRBSheet.current.open();
  };

  const SignOut = async () => {
    await removeLocalData('refreshToken');
    await removeLocalData('usercred');
    await removeLocalData('accesstoken');
    props.navigation.navigate('AuthStack');
  };
  const handleMembership = async (id, item) => {
    dispatch(getmemberClass(id));
    dispatch({
      type: Action.USER_GET_CURRENT_MEMBER_DATA,
      payload: item,
    });
    props.navigation.navigate('EnrolledChild');
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 60,
      compressImageMaxWidth: 60,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setfileUri(image.path);
      refRBSheet.current.close();
    });
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 60,
      compressImageMaxWidth: 60,
      cropping: true,
    }).then(image => {
      setfileUri(image.path);
      refRBSheet.current.close();
    });
  };

  const onHandleBackButton = () => {
    props.navigation.goBack();
  };
  useEffect(() => {
    getLocalUserData();

    token &&
      fetchCurrentUser({
        token: token,
      }).then(response => {
        console.log(response.user);
        dispatch({
          type: Action.USER_UPDATE_SUCCESS,
          payload: response.user,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    currentMember && dispatch(getmemberClass(currentMember._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomLayout
      style={styles.container}
      header
      headertext={'Profile'}
      headertextStyle={{
        // width: wp('90%'),
        fontSize: wp('8%'),
        marginBottom: hp('2%'),
      }}
      back
      backbutton={onHandleBackButton}>
      {/* <Text style={styles.title}>Profile</Text> */}

      <View style={styles.card}>
        <View style={styles.cardDetails}>
          <Text style={styles.memberName}>{parent.name}</Text>

          <Text style={styles.parentText}>Parent</Text>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => props.navigation.navigate('Edit_Profile')}>
          <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.childContainer}>
        <Text style={styles.yourChild}>Your children</Text>
        <TouchableOpacity
          style={styles.addChild}
          onPress={() => props.navigation.navigate('Addchildren')}>
          <Entypo
            name="plus"
            size={15}
            color="white"
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.addChildText}>Add Child</Text>
        </TouchableOpacity>
      </View>

      {/* children card starts here */}

      {membersdata && (
        <FlatList
          data={membersdata}
          key={item => item._id}
          renderItem={item => (
            <View style={styles.profileImageCard}>
              <View style={{flexDirection: 'row', marginTop: hp('3%')}}>
                <TouchableOpacity onPress={updateProfilePicture}>
                  {fileUri === null ? (
                    <Image
                      style={styles.image}
                      source={require('../../assets/images/children.jpg')}
                    />
                  ) : (
                    <Image style={styles.image} source={{uri: fileUri}} />
                  )}
                </TouchableOpacity>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Nunito-SemiBold',
                      marginBottom: wp('1%'),
                    }}>
                    {item.item.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleMembership(currentMember._id, item.item)}>
                <Text style={styles.cardButton}>Memberships / Classes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  dispatch({
                    type: Action.USER_GET_CURRENT_MEMBER_DATA,
                    payload: item.item,
                  });
                  dispatch(getmemberClass(item.item._id));
                  props.navigation.navigate('PaymentHistory');
                }}>
                <Text style={styles.cardButton}>Payment History</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* children card ends here */}

      <TouchableOpacity onPress={() => SignOut()}>
        <Text style={styles.signoutButton}>Sign out</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: '40%',
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
        }}>
        <View style={{paddingHorizontal: wp('10%')}}>
          <Pressable style={[styles.button1]} onPress={takePhotoFromCamera}>
            <Text style={styles.textStyle}>Take Photo</Text>
          </Pressable>

          <Pressable
            style={[styles.button1, {marginVertical: hp('1.5%')}]}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </Pressable>

          <Pressable
            style={[styles.button1]}
            onPress={() => refRBSheet.current.close()}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </RBSheet>
    </CustomLayout>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {},
  button: {
    alignSelf: 'center',
    height: hp('8.7%'),
    width: '90%',
    backgroundColor: colors.white,
    marginTop: hp('2%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    borderBottomColor: colors.blackOpacity,
    borderTopColor: colors.blackOpacity,
    borderLeftColor: colors.blackOpacity,
    borderRightColor: colors.blackOpacity,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: wp('3%'),
    marginHorizontal: wp('5.4%'),
    marginBottom: hp('1%'),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.profileColorGray,
    height: hp('15%'),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    borderRadius: wp('5%'),
  },
  cardButton: {
    paddingLeft: wp('15%'),
    alignSelf: 'flex-start',
    fontSize: wp('4.5%'),
    fontFamily: 'Nunito-Regular',
  },
  yourChild: {
    alignSelf: 'center',
    color: colors.blackOpacity,
    fontSize: wp('4.3%'),
    fontFamily: 'Nunito-Regular',
  },
  profileImageCard: {
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    height: hp('37%'),
    width: '93%',
    backgroundColor: colors.white,
    borderRadius: wp('5%'),
    alignSelf: 'center',
    elevation: 5,
  },

  signoutButton: {
    fontSize: wp('4.5%'),
    alignSelf: 'center',
    marginVertical: hp('4.5%'),
    // paddingVertical: windowHeight - 645,
    color: colors.orange,
    fontFamily: 'Nunito-SemiBold',
  },
  addChild: {
    height: hp('7%'),
    width: '33%',
    borderRadius: wp('4%'),
    backgroundColor: colors.orange,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
  },
  editProfile: {
    fontSize: wp('4%'),
    color: colors.orange,
    fontFamily: 'Nunito-SemiBold',
  },

  button1: {
    borderRadius: wp('3%'),
    padding: wp('5%'),
    elevation: 2,
    backgroundColor: colors.orange,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addChildText: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: 'Nunito-SemiBold',
    justifyContent: 'center',
  },
  childContainer: {
    flexDirection: 'row',
    padding: wp('6%'),
    justifyContent: 'space-between',
  },
  memberName: {
    color: colors.black,
    fontSize: wp('5%'),
    fontFamily: 'Nunito-SemiBold',
  },
  cardDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('7%'),
    marginBottom: hp('3%'),
    fontFamily: 'Nunito-SemiBold',
  },
  parentText: {
    color: colors.blackOpacity,
    fontFamily: 'Nunito-Regular',
  },
});
