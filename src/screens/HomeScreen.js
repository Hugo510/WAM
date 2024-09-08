import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <View>
            <Text>Bienvenido al Home</Text>
            <Button
                title="Cerrar Sesión"
                onPress={() => dispatch(logout())}
            />
        </View>
    );
};

export default HomeScreen;
