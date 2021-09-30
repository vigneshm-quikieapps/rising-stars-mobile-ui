/*
status=Attained
status2=Progress
*/


import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { colors, wp, hp } from '../Constant/Constant'
import LinearGradient from 'react-native-linear-gradient';


const data = [
  { id: 1, "labelId1": 1, "label1": `Basic stretching  ${'\n'} regim`, "label1status": "Attained", "labelId2": 2, "label2": `alking along  ${'\n'} balancing beam`, "label2status": "Attained", "labelId3": 3, "label3": "Shoulder Stand", "label3status": "Attained", "status": true, "mark": true },
  { id: 2, "labelId1": 1, "label1": "Basic streching", "label1status": "Attained", "labelId2": 2, "label2": `alking along ${'\n'} balancing beam`, "label2status": "In Progress", "labelId3": 3, "label3": "Shoulder Stand", "label3status": "In Progress", "status": false, "status2": true },
  { id: 3, "labelId1": 1, "label1": "Back-In, Full-Out", "label1status": "Upcoming", "status": false, "status2": false },
  { id: 5, "labelId1": 1, "label1": "Layout Position", "label1status": "Upcoming", "status": false, "status2": false },
  { id: 6, "labelId1": 1, "label1": "Layout Position", "label1status": "Upcoming", "status": false, "status2": false },
]

const Timelines = (props) => {

  const [expand, setExpand] = useState(false)
  const handlesubmit = () => {

  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => {

          return (
            <View style={styles.container}>
              <View>
                {
                  item.item.mark ? <View style={{ height: hp('2%') }} /> : <View style={{ height: hp('0%') }} />
                }
                <View style={[styles.circle, props.circle, { borderColor: item.item.status ? "#4ec0a0" : item.item.status2 ? colors.orange : "#e3e3e3" }]}>
                  {
                    item.item.status ? <Image source={require('../assets/images/icon-check-line.png')} style={styles.tick} /> : item.item.status2 ? <LinearGradient colors={['#ffa300', '#ff7e00']} style={styles.dot} /> : null
                  }
                </View>
                <View style={[styles.line, props.line,
                {
                  borderColor: item.item.status ? "#4ec0a0" : item.item.status2 ? colors.orange : "#e3e3e3",
                  height: !expand ? hp('7%') : item.item.status ? hp('28%') : item.item.status2 ? hp('26%') : hp('9.5%')
                }]} />
              </View>

              <LinearGradient style={[styles.subcontainer,
              { marginTop: item.item.mark ? hp('0%') : -hp('2%'), height: !expand ? hp('10%') : "auto" }, props.subcontainer]}
                colors={item.item.status ? ['rgb(104,214,171)', 'rgb(51,171,150)'] : item.item.status2 ? ['#ffa300', '#ff7e00'] : ['rgb(242,242,242)', 'rgb(242,242,242)']} >
                {
                  item.item.status ? <View style={styles.smallcircle}><Image source={require('../assets/images/checkmark.png')} style={styles.smalltick} /></View> : item.item.status2 ? <View style={styles.smallcircle}><Image source={require('../assets/images/checkmark.png')} style={styles.smalltick} /></View> : null
                }
                <View style={{ marginLeft: item.item.status ? wp('4%') : item.item.status2 ? wp('4%') : wp('0%'), marginTop: -hp('1.5%') }}>
                  {
                    item.item.labelId1 &&
                    <>
                      <View style={{ flexDirection: 'row', marginTop: -hp('1%') }}>
                        <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black" }]}>{item.item.labelId1}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black", width: wp('44%') }]}> {item.item.label1}</Text>

                          {
                            item.item.status ?
                              <TouchableOpacity onPress={() => setExpand(!expand)} style={styles.buttons}>
                                <Text style={{ color: 'white' }}>{expand ? "-" : "+"}</Text>
                              </TouchableOpacity>
                              : item.item.status2 ?
                                <TouchableOpacity onPress={() => setExpand(!expand)} style={styles.buttons}>
                                  <Text style={{ color: 'white' }}>{expand ? "-" : "+"}</Text>
                                </TouchableOpacity> : null
                          }
                        </View>
                      </View>
                      <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : colors.grey, marginLeft: wp('4%') }]}>{item.item.label1status}</Text>
                    </>
                  }
                  {
                    item.item.labelId2 &&
                    <>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black" }]}>{item.item.labelId2}</Text>
                        <View >
                          <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black", width: wp('40%') }]}> {item.item.label2}</Text>
                        </View>
                      </View>
                      <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : colors.grey, marginLeft: wp('4%') }]}>{item.item.label2status}</Text>
                    </>
                  }
                  {
                    item.item.labelId3 && <>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black" }]}>{item.item.labelId3}</Text>
                        <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : "black", width: wp('60%'), width: wp('40%') }]}> {item.item.label3}</Text>
                      </View>
                      <Text style={[styles.insidetext, { color: item.item.status ? "white" : item.item.status2 ? "white" : colors.grey, marginLeft: wp('4%') }]}>{item.item.label3status}</Text>
                    </>
                  }

                </View>
              </LinearGradient>

            </View >
          )
        }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  circle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    borderWidth: 1.5,
    height: hp('7%'),
    width: hp('0%'),
    marginLeft: hp('2.42%')
  },
  tick: {
    height: hp('2.5%'),
    width: hp('2.5%'),
  },
  dot: {
    height: hp('2%'),
    width: hp('2%'),
    borderRadius: 50,
  },
  subcontainer: {
    flex: 1,
    // borderWidth: 1,
    // height: hp('10%'),
    paddingTop: hp('5%'),
    marginLeft: wp('5%'),
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: wp('5%'),
    marginBottom: hp('4%')
  },
  smallcircle: {
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white'
  },
  smalltick: {
    height: hp('2%'),
    width: hp('2%'),
  },
  insidetext: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('2%'),
  },
  buttons: {
    height: hp('3%'),
    width: hp('3%'),
    backgroundColor: "black",
    borderRadius: 25,
    // marginRight: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -hp('1.5%')
  }
})

export default Timelines
