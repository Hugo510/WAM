import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import WelcomeStack from './WelcomeStack';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const { isAuthenticated, isFirstTimeUser } = useSelector((state) => state.user);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: true,
            }}>
                {/* Siempre incluye todas las pantallas */}
                <Stack.Screen name="WelcomeStack" component={WelcomeStack} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="MainTabs" component={MainTabs} />

                {/* Redirigir en función del estado de autenticación */}
                {isFirstTimeUser ? (
                    <Stack.Screen name="Welcome" component={WelcomeStack} />
                ) : !isAuthenticated ? (
                    <Stack.Screen name="Auth" component={AuthStack} />
                ) : (
                    <Stack.Screen name="Main" component={MainTabs} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
