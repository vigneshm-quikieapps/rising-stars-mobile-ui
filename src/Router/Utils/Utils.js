import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export const StackScreen = createStackNavigator();

export const Stack = (props) => {
    const horizontalAnimation = {
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };
    return (

        <StackScreen.Navigator
            screenOptions={horizontalAnimation}
        >
            {
                props.children
            }
        </StackScreen.Navigator>
    )
}

