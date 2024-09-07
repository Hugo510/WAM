import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Configura la navegación de toda la app
import { createStackNavigator } from '@react-navigation/stack'; // Crea un stack de pantallas
import LoginScreen from '../screens/LoginScreen';  // Pantalla de Login
import HomeScreen from '../screens/HomeScreen';    // Pantalla Home para usuarios
import AdminScreen from '../screens/AdminScreen';  // Pantalla Admin para administradores
import { useSelector } from 'react-redux';         // Permite obtener el estado de Redux
import ProtectedRoute from './ProtectedRoute';     // Componente que protege rutas basadas en roles

const Stack = createStackNavigator();  // Creación del stack de navegación

const AppNavigator = () => {
    // Obtiene del estado de Redux si el usuario está autenticado y cuál es su rol
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>  // Contenedor de la navegación
            <Stack.Navigator>
                {/* Si el usuario no está autenticado, muestra la pantalla de login */}
                {!isAuthenticated ? (
                    <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                    <>
                        {/* Si el usuario está autenticado, muestra la pantalla Home para todos los usuarios */}
                        <Stack.Screen name="Home" component={HomeScreen} />

                        {/* Para los administradores, protegemos la pantalla Admin con 'ProtectedRoute' */}
                        <Stack.Screen
                            name="Admin"
                            children={() => (
                                <ProtectedRoute requiredRole="admin">
                                    <AdminScreen />
                                </ProtectedRoute>
                            )}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
