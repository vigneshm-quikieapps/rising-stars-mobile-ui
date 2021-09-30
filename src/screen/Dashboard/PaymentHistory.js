import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import CustomLayout from '../../custom/CustomLayout'
import Studentcard from '../../custom/Studentcard'
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
                            <Studentcard
                                name={item.item.name}
                                id={'KKBK1211'}
                                activityrequired
                                activity={`Pre-school gymnastics(Age1-3)`}
                                subactivity={'Childhood Joy Classes'}
                                clubid={"PDPS4212"}
                                style={{ backgroundColor: colors.orange, marginHorizontal: wp('1%') }}
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
                    notify={"OverDues"}
                    amount={"25"}
                    body={"September 2021 fee"}
                    date={"Due Date 01/09/2021"}
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
                                notify={item.item.condition ? "Paid" : "Upcoming"}
                                amount={item.item.amount}
                                body={"Pre-school gym fee"}
                                date={"Due Date 10/08/2021"}
                                paidtext={"Paid on 12/08/2021"}
                                substyle={{ backgroundColor: item.item.condition ? colors.veryLightGreen : "white", borderColor: item.item.condition ? "white" : colors.orange, borderWidth: item.item.condition ? 0 : 1, width: wp('81.7%') }}
                                style={{ backgroundColor: item.item.condition ? colors.seafoamBlue : colors.reddish }}

                            />
                        )
                    }}
                />

            </PaymentCard>
        </CustomLayout>
    )
}
