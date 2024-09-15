import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');

const AdvancedCreditCard3D = () => {
    const [rotateAnim] = useState(new Animated.Value(0)); // Controla la rotación
    const [tiltAnim] = useState(new Animated.Value(0)); // Controla la inclinación

    // PanResponder para detectar gestos de arrastre
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            const rotateValue = gestureState.dx / 10; // Rotación sobre el eje Y
            const tiltValue = gestureState.dy / 10; // Inclinación sobre el eje X
            rotateAnim.setValue(rotateValue);
            tiltAnim.setValue(tiltValue);
        },
        onPanResponderRelease: () => {
            // Vuelve la tarjeta a la posición inicial
            Animated.spring(rotateAnim, { toValue: 0, useNativeDriver: true }).start();
            Animated.spring(tiltAnim, { toValue: 0, useNativeDriver: true }).start();
        },
    });

    // Interpolación para rotación 3D
    const rotateY = rotateAnim.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-15deg', '15deg'],
    });

    const rotateX = tiltAnim.interpolate({
        inputRange: [-100, 100],
        outputRange: ['15deg', '-15deg'],
    });

    const animatedStyle = {
        transform: [{ perspective: 1000 }, { rotateY }, { rotateX }],
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Animated.View style={[styles.card, animatedStyle]}>
                {/* Parte superior de la tarjeta */}
                <View style={styles.cardHeader}>
                    {/* <Image source={require('../assets/chip.png')} style={styles.chip} />
                    <Image source={require('../assets/visa-logo.png')} style={styles.visaLogo} /> */}
                </View>
                {/* Información de la tarjeta */}
                <View style={styles.cardBody}>
                    <Text style={styles.cardNumber}>**** **** **** 1234</Text>
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardHolder}>John Doe</Text>
                        <Text style={styles.expiryDate}>12/24</Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    card: {
        width: width * 0.8,
        height: 200,
        backgroundColor: '#1e3a8a', // Azul oscuro con tono moderno
        borderRadius: 15,
        justifyContent: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10, // Para sombras en Android
        borderWidth: 1,
        borderColor: '#fff', // Bordes finos para darle un toque moderno
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chip: {
        width: 40,
        height: 40,
    },
    visaLogo: {
        width: 60,
        height: 20,
    },
    cardBody: {
        marginTop: 30,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 22,
        letterSpacing: 2,
        marginBottom: 15,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHolder: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    expiryDate: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AdvancedCreditCard3D;
