// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {hp, wp, colors} from '../constant/Constant';
// import AntIcon from 'react-native-vector-icons/AntDesign';

// export default function CustomLayout(props) {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         backgroundColor: '#fff',
//       }}>
//       <View style={styles.container}>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity style={styles.backIcon} onPress={props.backbutton}>
//             <Image source={require('../assets/images/icon-back-line.png')} />
//           </TouchableOpacity>
//           <View style={styles.centertext}>
//             <Text style={{fontSize: hp('2.1%'), fontFamily: 'Nunito-SemiBold'}}>
//               {props.names}
//             </Text>
//           </View>
//         </View>
//         {props.Customchildren}
//         <View style={styles.header}>
//           <View>
//             {props.steps ? (
//               <Text style={styles.step}>
//                 Step {props.start} of {props.end}
//               </Text>
//             ) : null}

//             {props.headerTextBigText && props.header ? (
//               <Text
//                 style={[
//                   styles.headertext,
//                   props.headertextStyle,
//                   {fontSize: wp('8%')},
//                 ]}>
//                 {props.headertext}
//               </Text>
//             ) : (
//               <Text style={[styles.headertext, props.headertextStyle]}>
//                 {props.headertext}
//               </Text>
//             )}

//             {props.subheader ? (
//               <Text
//                 style={[
//                   styles.subheadertext,
//                   props.subheadertextstyle,
//                   {fontSize: wp('4%')},
//                 ]}>
//                 {props.subheadertext}
//               </Text>
//             ) : null}
//           </View>

//           {props.Customchildren2}
//         </View>
//         {props.Customchildren3}
//         {props.namerequired ? (
//           <View>
//             <Text>{props.name}</Text>
//             <View style={styles.downIcons}>
//               <AntIcon name="down" />
//             </View>
//           </View>
//         ) : null}
//         {props.children}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: hp('2%'),
//     backgroundColor: colors.white,
//   },
//   header: {
//     flex: 1,
//     flexDirection: 'row',
//     marginTop: hp('2.5%'),
//     justifyContent: 'space-between',
//   },
//   backIcon: {
//     // borderWidth: 1,
//     // width: hp('2.5%'),
//     // borderRadius: 4,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // height: hp('2.5%'),
//   },
//   headertext: {
//     // fontSize: hp('3.5%'),
//     fontSize: wp('5.5%'),
//     // fontWeight: 'bold',
//     fontFamily: 'Nunito-SemiBold',
//     // fontSize:30,
//     width: wp('65%'),
//   },
//   subheadertext: {
//     fontFamily: 'Nunito-SemiBold',
//     fontSize: wp('5%'),
//     marginTop: hp('1%'),
//     width: wp('65%'),
//   },
//   step: {
//     fontSize: wp('3.5%'),
//     color: colors.grey,
//     fontFamily: 'Nunito-Regular',
//   },
//   downIcons: {
//     width: hp('2.5%'),
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: hp('2.5%'),
//     color: 'red',
//   },
//   centertext: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {hp, wp, colors} from '../Constant/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function CustomLayout(props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#fff',
      }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.backIcon} onPress={props.backbutton}>
            <Image source={require('../assets/images/icon-back-line.png')} />
          </TouchableOpacity>
          <View style={styles.centertext}>
            <Text style={{fontSize: wp('5%'), fontFamily: 'Nunito-SemiBold'}}>
              {props.names}
            </Text>
          </View>
        </View>
        {props.Customchildren}
        <View style={styles.header}>
          <View>
            {props.steps ? (
              <Text style={styles.step}>
                Step {props.start} of {props.end}
              </Text>
            ) : null}

            {props.headerTextBigText && props.header ? (
              <Text
                style={[
                  styles.headertext,
                  props.headertextStyle,
                  {fontSize: wp('8%')},
                ]}>
                {props.headertext}
              </Text>
            ) : (
              <Text style={[styles.headertext, props.headertextStyle]}>
                {props.headertext}
              </Text>
            )}

            {props.subheader ? (
              <Text
                style={[
                  styles.subheadertext,
                  props.subheadertextstyle,
                  {fontSize: wp('4%')},
                ]}>
                {props.subheadertext}
              </Text>
            ) : null}
          </View>

          {props.Customchildren2}
        </View>
        {props.Customchildren3}
        {props.namerequired ? (
          <View>
            <Text>{props.name}</Text>
            <View style={styles.downIcons}>
              <AntIcon name="down" />
            </View>
          </View>
        ) : null}
        {props.children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2.5%'),
    justifyContent: 'space-between',
  },
  // backIcon: {
  //   borderWidth: 1,
  //   width: hp('2.5%'),
  //   borderRadius: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: hp('2.5%'),
  // },
  headertext: {
    // fontSize: hp('3.5%'),
    fontSize: wp('5.5%'),
    // fontWeight: 'bold',
    fontFamily: 'Nunito-SemiBold',
    // fontSize:30,
    width: wp('65%'),
  },
  subheadertext: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: wp('5%'),
    marginTop: hp('1%'),
    width: wp('65%'),
  },
  step: {
    fontSize: wp('3.5%'),
    color: colors.grey,
    fontFamily: 'Nunito-Regular',
  },
  downIcons: {
    width: wp('2.5%'),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('2.5%'),
    color: 'red',
  },
  centertext: {
    flex: 1,
    alignItems: 'center',
  },
});