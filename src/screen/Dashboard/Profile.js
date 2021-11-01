import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

import { removeLocalData } from '../../utils/LocalStorage'
import CustomLayout from '../../custom/CustomLayout';
import { colors, hp, wp } from '../../Constant/Constant';


function Profile(props) {
  // let steps = false;
  const refRBSheet = useRef();

  const [fileUri, setfileUri] = useState(null);

  const updateProfilePicture = () => {
    refRBSheet.current.open();
  };

  const SignOut = async () => {
    console.log('hello')
    await removeLocalData('refreshToken')

  }

  useEffect(() => {
    SignOut
  }, [])

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
          <Text style={styles.memberName}>Nizam Mogal</Text>

          <Text style={styles.parentText}>Parent</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.editProfile}>Edit Profile</Text>
        </View>
      </View>

      <View style={styles.childContainer}>
        <Text style={styles.yourChild}>Your child</Text>
        <TouchableOpacity
          style={styles.addChild}
          onPress={() => props.navigation.navigate('Addchildren')}>
          <Entypo
            name="plus"
            size={15}
            color="white"
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.addChildText}>Add Child</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileImageCard}>
        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
          <TouchableOpacity onPress={updateProfilePicture}>
            {fileUri === null ? (
              <Image
                style={styles.image}
                source={require('../../assets/images/children.jpg')}
              />
            ) : (
              <Image style={styles.image} source={{ uri: fileUri }} />
            )}
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Nunito-SemiBold',
                marginBottom: wp('1%'),
              }}>
              Ayman Mogal
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('EnrolledChild')}>
          <Text style={styles.cardButton}>Memberships / Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('PaymentHistory')}>
          <Text style={styles.cardButton}>Payment History</Text>
        </TouchableOpacity>
      </View>

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
        <View style={{ paddingHorizontal: wp('10%') }}>
          <Pressable style={[styles.button1]} onPress={takePhotoFromCamera}>
            <Text style={styles.textStyle}>Take Photo</Text>
          </Pressable>

          <Pressable
            style={[styles.button1, { marginVertical: hp('1.5%') }]}
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
