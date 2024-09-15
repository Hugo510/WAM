import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // Importa la librería de animaciones

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco del input
    const [showError, setShowError] = useState(false); // Estado para mostrar el mensaje de error

    const handleStart = () => {
        if (name.trim()) {
            navigation.navigate('Survey', { userName: name });
        } else {
            setShowError(true); // Mostrar mensaje si no se ingresa nombre
            // Ocultar el mensaje después de un tiempo
            setTimeout(() => setShowError(false), 3000); // Ocultar después de 3 segundos
        }
    };

    return (
        <Animatable.View style={styles.container} animation="fadeIn" duration={1000}>
            <Animatable.Text style={styles.title} animation="bounceInDown" duration={1000}>
                ¡Bienvenido a la App!
            </Animatable.Text>
            <Animatable.Text style={styles.subtitle} animation="fadeIn" duration={1000} delay={300}>
                Nos gustaría conocerte mejor.
            </Animatable.Text>

            {/* Input de texto minimalista */}
            <Animatable.View animation="fadeInUp" duration={1000} delay={600} style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]} // Cambiar estilos en foco
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!name)} // Mantener realce si hay texto
                />
                {/* Animación de la línea debajo del input */}
                <Animatable.View
                    animation={isFocused || name ? 'fadeInLeft' : 'fadeOutLeft'}
                    duration={500}
                    style={[styles.inputUnderline, (isFocused || name) && styles.inputUnderlineFocused]}
                />
            </Animatable.View>

            {/* Mostrar mensaje de error si el campo está vacío */}
            {showError && (
                <Animatable.Text
                    animation="fadeIn"
                    duration={500}
                    style={styles.errorText}
                >
                    Por favor, ingresa tu nombre.
                </Animatable.Text>
            )}

            {/* Botón para comenzar */}
            <Animatable.View animation="pulse" duration={1000} delay={900}>
                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>Comenzar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 40,
    },
    input: {
        fontSize: 18,
        color: '#333',
        paddingVertical: 8,
        paddingHorizontal: 0,
        borderBottomWidth: 0, // No border
    },
    inputFocused: {
        color: '#d32f2f', // Cambiar el color del texto al rojo cereza cuando está enfocado
    },
    inputUnderline: {
        height: 2,
        backgroundColor: '#999', // Color de la línea cuando no está enfocado
        marginTop: -5,
    },
    inputUnderlineFocused: {
        backgroundColor: '#d32f2f', // Color rojo cereza cuando está enfocado
        height: 3, // La línea se engrosa cuando está enfocado
    },
    errorText: {
        color: '#d32f2f', // Color rojo cereza para el mensaje de error
        fontSize: 14,
        marginTop: -30,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#d32f2f', // Color rojo cereza
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
