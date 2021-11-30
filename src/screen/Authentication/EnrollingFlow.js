import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, FlatList} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {AppButton, CustomLayout} from './../../components';
import {colors, wp, hp, Fontsize} from './../../constants';
import LinearGradient from 'react-native-linear-gradient';

function EnrollingFlow(props) {
  const data = [
    {id: 1, title: 'Step 1', description: 'Add Child and Emergency Contact'},
    {id: 2, title: 'Step 2', description: 'Class Selection'},
    {id: 3, title: 'Step 3', description: 'Fees Overview'},
    {id: 4, title: 'Step 4', description: 'Provide Consent'},
    {id: 5, title: 'Step 5', description: 'Additional Sections'},
    {id: 6, title: 'Step 6', description: 'Pay'},
    {id: 7, title: 'Step 7', description: 'Confirmation'},
  ];

  const renderCircle = (rowData, sectionID, rowID) => {
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
      headertext={'Enter Child To a Club Activity'}
      headertextStyle={{
        fontSize: wp('8%'),
      }}>
      <View style={{height: hp('2%')}} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => {
          return (
            <View style={styles.container}>
              <View>
                <LinearGradient
                  colors={['#ffa300', '#ff7e00']}
                  style={styles.circle}>
                  <Text style={styles.circlecontainer}>{item.item.id}</Text>
                </LinearGradient>
                {item.item.id < 7 ? <View style={styles.line} /> : null}
              </View>
              <View style={{marginLeft: wp('2%')}}>
                <Text
                  style={{color: colors.grey, fontFamily: 'Nunito-Regular'}}>
                  {item.item.title}
                </Text>
                <Text
                  style={{fontFamily: 'Nunito-SemiBold', fontSize: Fontsize}}>
                  {item.item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <AppButton
        title="Let's Start"
        onPress={() => props.navigation.navigate('AddChild')}
        style={{fontFamily: 'Nunito-SemiBold', margin: 0}}
      />
    </CustomLayout>
  );
}
export default EnrollingFlow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  circle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlecontainer: {
    fontFamily: 'Nunito-SemiBold',
    color: 'white',
    fontSize: Fontsize,
  },
  line: {
    height: hp('5%'),
    width: wp('0.3%'),
    backgroundColor: colors.orange,
    alignSelf: 'center',
  },
});
