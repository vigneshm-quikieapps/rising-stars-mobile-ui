import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import AppButton from './../../custom/AppButton';
import {colors, wp,hp} from './../../Constant/Constant';
import CustomLayout from './../../custom/CustomLayout';

const width = Dimensions.get('window').width;
function EnrollingFlow(props) {
  const [data, setData] = useState([
    {no: 1, title: 'Step 1', description: 'Add Child and Emergency Contact'},
    {no: 2, title: 'Step 2', description: 'Class Selection'},
    {no: 3, title: 'Step 3', description: 'Fees Overview'},
    {no: 4, title: 'Step 4', description: 'Provide Consent'},
    {no: 5, title: 'Step 5', description: 'Additional Sections'},
    {no: 6, title: 'Step 6', description: 'Pay'},
    {no: 7, title: 'Step 7', description: 'Confirmation'},
  ]);
  renderCircle = (rowData, sectionID, rowID) => {
    let title = (
      <Text style={{alignSelf: 'center', color: colors.white}}>
        {rowData.no}
      </Text>
    );

    return <View style={styles.timelineCircle}>{title}</View>;
  };

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={styles.renderDetailTitle}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description) {
      desc = (
        <View>
          <Text style={{fontSize: wp('4.8%'), fontFamily: ' Nunito-SemiBold'}}>
            {rowData.description}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: rowData.color,
          padding: wp('2%'),
          borderRadius: 15,
          // marginVertical: hp('10%'),
        }}>
        {title}
        {desc}
      </View>
    );
  };
  const onHandleBackButton = () => {
    props.navigation.goBack();
  };
  return (
    <CustomLayout
      backbutton={onHandleBackButton}
      headertext={'Enrol Child To a Club Activity'}
      headertextStyle={{
        fontSize: wp('8%'),
        // backgroundColor: 'pink',
      }}>
      {/* <Text style={styles.heading}>
        Enter Child To a {'\n'}
        Club Activity
      </Text> */}

      <Timeline
        data={data}
        renderCircle={renderCircle}
        renderDetail={renderDetail}
        lineColor={colors.lineColor}
        separator={false}
        circleSize={10}
      />

      <AppButton
        title="Let's Start"
        onPress={() => props.navigation.navigate('AddChild')}
        style={{fontFamily: 'Nunito-SemiBold'}}
      />
    </CustomLayout>
  );
}
export default EnrollingFlow;
const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: wp('10%'),
  },
  timelineCircle: {
    position: 'absolute',
    left: width * 0.5,
    transform: [
      {
        translateX: wp('-38%'),
      },
    ],
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: wp('10%'),
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  // heading: {
  //   fontSize: wp('9%'),
  //   marginTop: -10,
  //   marginBottom: 10,
  //   fontFamily: 'Nunito-SemiBold',
  // },
  renderDetailTitle: {
    color: colors.blackOpacity,
    fontSize: wp('3.8%'),
    fontFamily: 'Nunito-Regular',
  },
});