import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SurveyScreen from '../screens/SurveyScreen';

const Stack = createStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: true,
            gestureEnabled: true,
        }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Survey" component={SurveyScreen} />
        </Stack.Navigator>
    );
};

export default WelcomeStack;
