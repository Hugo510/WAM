import React from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
/* import ProfileScreen from '../screens/ProfileScreen'; */
import AdminScreen from '../screens/AdminScreen';  // Solo visible para admins
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Iconos nativos para mejorar la UI/UX

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Admin') {
                            iconName = 'settings-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        height: Platform.OS === 'android' ? 70 : 80,  // Ajustar la altura para Android/iOS
                        paddingBottom: Platform.OS === 'android' ? 10 : 20,  // Ajustar espacio en la parte inferior
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
                <Tab.Screen name="Admin" component={AdminScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default MainTabs;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Platform.OS === 'android' ? '#fff' : '#f5f5f5',  // Fondo adaptado a la plataforma
    },
});