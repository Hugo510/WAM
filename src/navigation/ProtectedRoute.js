import React from 'react';
import { View, Text } from 'react-native';  // Elementos básicos de UI en React Native
import { useSelector } from 'react-redux';  // Permite acceder al estado de Redux

const ProtectedRoute = ({ children, requiredRole }) => {
    // Obtener el rol del usuario desde Redux
    const { userRole } = useSelector((state) => state.auth);

    // Si el rol del usuario no coincide con el rol requerido, se muestra un mensaje de error
    if (userRole !== requiredRole) {
        return (
            <View>
                <Text>No tienes permisos para acceder a esta pantalla</Text>
            </View>
        );
    }

    // Si el usuario tiene el rol correcto, se le permite acceder al componente hijo (pantalla)
    return children;
};

export default ProtectedRoute;
