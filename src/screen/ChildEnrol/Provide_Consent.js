/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  Input,
  ForwardButton,
  ErrorMessage,
} from '../../components';
import {colors, hp, wp, Fontsize, Stepend} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import EntIcon from 'react-native-vector-icons/Entypo';
import {setProvide} from '../../redux/action/enrol';

import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const Provide_Consent = props => {
  const termref = useRef();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [condition, setCondition] = useState('');
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [photo, setPhoto] = useState('');
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [sign, setSign] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);

  const child = useSelector(state => state.childData.addchild);
  const club = useSelector(state => state.childData.clubdata);
  const {from} = props.route.params;

  //console.log('classes', from);
  // const membersdata = useSelector(state => state.memberData.memberData);
  const parent = useSelector(state => state.LoginData.updatedUser);

  // const clubRulesText =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standarddummy text ever since. Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since.Lorem Ipsum is simplydummy text of the printing and typesetting industry. Lorem Ipsum hasbeen the industry's standard dummy text ever since. Lorem Ipsum issimply dummy text of the printing and typesetting industry. LoremIpsum has been the industry's standard dummy text ever since. LoremIpsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text eversince.Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has been the industry's standarddummy text ever since. Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since. Lorem Ipsum is simplydummy text of the printing and typesetting industry. Lorem Ipsum hasbeen the industry's standard dummy text ever since. Lorem Ipsum issimply dummy text of the printing and typesetting industry. LoremIpsum has been the industry's standard dummy text ever since.";

  // const clubRulesPopUPHeigth = text => {
  //   let lines = text.split(' ').length / 10;
  //   return lines * 5 < 75 ? `${lines * 5}%` : '75%';
  // };

  const memberClassData = useSelector(state => state.memberClassData.classData);
  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          age={
            new Date().getFullYear() - parseInt(child.member.dob.slice(0, 4))
          }
          // clubid={memberClassData[0]?.clubMembershipId}
          // activityrequired
          // activity={club.name}
        />
      }
      steps
      start={4}
      end={Stepend}
      back
      header
      headertext={`Provide ${'\n'}Consent`}
      headertextStyle={{
        fontFamily: 'Nunito-SemiBold',
        fontSize: 33,
      }}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={4} />}>
      <Conset
        conset={'Does your child have any allergies we should be aware of'}
        value={isEnabled}
        onValueChange={() => setIsEnabled(!isEnabled)}
      />
      {isEnabled && (
        <View style={styles.textarea}>
          <Input
            placeholder="Allergy details..."
            placeholderTextColor={colors.grey}
            onChangeText={text => setAllergies(text)}
          />
        </View>
      )}

      <Conset
        conset={'Does your child have any conditions we should be aware of'}
        value={isEnabled2}
        onValueChange={() => setIsEnabled2(!isEnabled2)}
      />
      {isEnabled2 && (
        <View style={styles.textarea}>
          <Input
            placeholder="Condition details..."
            placeholderTextColor={colors.grey}
            onChangeText={text => setCondition(text)}
          />
        </View>
      )}
      <View style={styles.remark}>
        <View style={styles.mark}>
          <Image source={require('../../assets/images/icon-info.png')} />
        </View>
        <Text style={styles.marktext}>
          {club.name}'s occasionallu takes videos and photographs for
          promotional and training purposes and during displays
        </Text>
      </View>
      {/* <TouchableOpacity onPress={() => termref.current.open()}>
        <Text style={styles.bottom}>Read more about Club Rule</Text>
      </TouchableOpacity> */}
      {/* <RBSheet
        ref={termref}
        animationType="slide"
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity,
          },
          container: {
            height: clubRulesPopUPHeigth(clubRulesText),
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
        }}>
        <View style={{paddingHorizontal: wp('5%')}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: Fontsize,
                color: '#ff7e00',
              }}>
              Club Rule
            </Text>
            <TouchableOpacity onPress={() => termref.current.close()}>
              <LinearGradient
                style={styles.closePopUp}
                colors={['#ffa300', '#ff7e00']}>
                <EntIcon name="cross" size={15} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              marginVertical: hp('1.5%'),
              fontSize: Fontsize,
              alignSelf: 'center',
            }}>
            {clubRulesText}
          </Text>
        </View>
      </RBSheet> */}
      <Conset
        conset={'I do consent to my child to be photographed for any purpose'}
        value={isEnabled3}
        onValueChange={() => setIsEnabled3(!isEnabled3)}
      />
      {/* {isEnabled3 && (
        <View style={styles.textarea}>
          <Input
            placeholder="Allergy details..."
            placeholderTextColor={colors.grey}
            onChangeText={text => setPhoto(text)}
          />
        </View>
      )} */}
      <Conset
        conset={`Signed by  ${parent.name} ${'\n'}(Parent / Carer)`}
        value={isEnabled4}
        onValueChange={() => setIsEnabled4(!isEnabled4)}
      />
      {/* {isEnabled4 && (
        <View style={styles.textarea}>
          <Input
            // placeholder="Signed by Jube Bowman(Parent / Carer)"
            placeholder={`Signed by ${parent.name}(Parent / Carer)`}
            placeholderTextColor={colors.grey}
            style={{width: wp('85%')}}
            onChangeText={text => setSign(text)}
            // multiline={true}
          />
        </View>
      )} */}
      <ErrorMessage visible={errorFlag} error={'Sign is required*'} />

      <ForwardButton
        style={{alignSelf: 'flex-end', marginTop: hp('1%')}}
        onPress={() => {
          var consent = {};
          if (isEnabled === true) {
            consent.allergies = allergies;
          }
          if (isEnabled2 === true) {
            consent.condition = condition;
          }
          if (isEnabled3 === true) {
            consent.photo = photo;
          }
          if (isEnabled4 === true) {
            consent.sign = sign;
          }
          if (isEnabled4 === false) {
            setErrorFlag(true);
          } else {
            dispatch(setProvide(consent));
            props.navigation.navigate('Additional_Sections', {from: from});
          }
        }}
      />
    </CustomLayout>
  );
};

const Conset = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.consettext}>{props.conset}</Text>
      <Switch
        trackColor={{false: '#767577', true: colors.pumpkinorange}}
        thumbColor={props.value ? colors.orange : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
    fontSize: Fontsize,
    justifyContent: 'space-between',
  },
  consettext: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    width: wp('80%'),
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 10,
    height: hp('10%'),
    paddingLeft: wp('2%'),
    paddingTop: hp('.1%'),
  },
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    paddingLeft: wp('2%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    marginVertical: hp('1%'),
  },
  mark: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('3%'),
    width: hp('3%'),
    marginRight: wp('2%'),
  },
  marktext: {
    color: '#d26800',
    alignSelf: 'center',
    flex: 1,
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
    marginLeft: 6,
  },
  bottom: {
    fontFamily: 'Nunito-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#ff7e00',
    textDecorationLine: 'underline',
    marginVertical: 5,
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
});

export default Provide_Consent;
