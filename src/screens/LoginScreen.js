import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Lógica para manejar el login
        dispatch(loginSuccess({ role }));
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Rol (admin o user)"
                value={role}
                onChangeText={setRole}
            />
            <Button
                title="Iniciar sesión"
                onPress={handleLogin}
            />
        </View>
    );
};

export default LoginScreen;
