import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import CustomLayout from '../../custom/CustomLayout'
import LinearStudentcard from '../../custom/LinearStudentCard'
import ClassCard from '../../custom/ClassCard'
import { PaymentCard, Card } from '../../custom/paymentcard'
import { colors, wp } from '../../Constant/Constant'


const data = [{ id: 1, "name": "Ayman Mongal" }, { id: 2, "name": "Syman Mongal" }, { id: 3, "name": "Ryman Mongal" }]
const payment = [{ id: 1, "amount": 6, "condition": true }, { id: 2, "amount": 23, "condition": false }, { id: 3, "amount": 45, "condition": false }]

export default function EnrolledChild() {
    return (
        <CustomLayout
            names={"Payment History"}
            Customchildren={
                <FlatList
                    data={data}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={item => {
                        return (
                            <LinearStudentcard
                                colors={["#ffa300", "#ff7e00"]}
                                name={'Ayman Mogal'}
                                style={{ backgroundColor: colors.orange }}
                                activityrequired
                                activity={`Zippy Totz Pre-school Gymnastics`}
                                subactivity={'Childhood Joy Classes'}
                                classname={'Childhood Joy Classes'}
                                clubid={'PDPS4212'}
                            />
                        )
                    }}
                />
            }
        >
            <Text style={{ fontFamily: "Nunito-SemiBold" }}>Current Classes Session</Text>
            <ClassCard
                // id={"PDPS4212"}
                classname={"Pre-school gymnastics(Age 1-3)"}
                subtitle={"Childhood Joy Classes"}
                day={"Monday"}
                time="9:30 am - 11:30 am"
                facility={"Gym Hall"}
                coach={"Henry Itondo"}
            />
            <PaymentCard

            >
                <Card
                    paystyle={{ backgroundColor: colors.reddish }}
                    notify={"Overdue"}
                    amount={"25"}
                    body={"August 2021 fee"}
                    date={"Due Date 01/08/2021"}
                    button
                    title="Pay Now"
                    paybutton={() => { }}
                    substyle={{ borderColor: colors.reddish, borderWidth: 1, }}
                    style={{ backgroundColor: colors.reddish }} />
                <Card
                    notify={"Upcoming"}
                    amount={"25"}
                    body={"September 2021 fee"}
                    date={"Due Date 01/09/2021"}
                    button
                    title="Pay Now"
                    paybutton={() => { }}
                    substyle={{ borderColor: colors.orange, borderWidth: 1, }}
                    style={{ backgroundColor: colors.reddish }} />

                <FlatList
                    data={payment}
                    horizontal={true}
                    pagingEnabled={true}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={item => {
                        return (
                            <Card
                                notify={item.item.condition ? "Paid" : "Future coming"}
                                amount={item.item.amount}
                                body={"Pre-school gym fee"}
                                date={"Due Date 10/08/2021"}
                                paidtext={"Paid on 12/08/2021"}
                                substyle={{ backgroundColor: item.item.condition ? colors.veryLightGreen : colors.lightgrey, borderColor: item.item.condition ? "white" : "white", width: wp('82%') }}
                                style={{ backgroundColor: item.item.condition ? colors.seafoamBlue : colors.lightgrey,borderWidth: item.item.condition ? 0:1,borderColor:item.item.condition ?null:"white"}}

                            />
                        )
                    }}
                />

            </PaymentCard>
        </CustomLayout>
    )
}
