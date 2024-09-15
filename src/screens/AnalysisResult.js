import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import AdvancedCreditCard3D from '../components/Card3D'; // Importar el modelo de tarjeta 3D
import ConfettiCannon from 'react-native-confetti-cannon'; // Para el efecto de confeti

const { width, height } = Dimensions.get('window');

const AnalysisResult = () => {
    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState(null);
    const [confettiVisible, setConfettiVisible] = useState(false);
    const [headerAnim] = useState(new Animated.Value(0)); // Animación de encabezado
    const [circles] = useState(new Animated.Value(0)); // Animación para los círculos flotantes

    useEffect(() => {
        // Simulación de datos del backend
        setTimeout(() => {
            setUserProfile({
                title: "Plan Financiero Personalizado",
                creditLimit: "$50,000 MXN",
                interestRate: "12% anual",
                cashback: "5% en compras",
                description: "Este plan está diseñado especialmente para ti, con un límite de crédito ajustado a tus necesidades y un cashback en todas tus compras.",
            });
        }, 2000);

        // Animar el encabezado al cargar la pantalla
        Animated.timing(headerAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Animación de los círculos flotantes
        Animated.loop(
            Animated.sequence([
                Animated.timing(circles, { toValue: 1, duration: 4000, useNativeDriver: true }),
                Animated.timing(circles, { toValue: 0, duration: 4000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const handleContinue = () => {
        // Mostrar confeti y redirigir al usuario
        setConfettiVisible(true);
        setTimeout(() => {
            navigation.navigate('FinancialPlan', { userName: 'Juan Pérez' });
        }, 1500); // Redirige después de 1.5 segundos
    };

    const animatedHeaderStyle = {
        opacity: headerAnim,
        transform: [
            {
                translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                }),
            },
        ],
    };

    const circleAnimationStyle = {
        opacity: circles.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        }),
        transform: [
            {
                translateY: circles.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Fondo animado con círculos flotantes */}
            <Animated.View
                style={[styles.circle, circleAnimationStyle, { top: 100, left: 50 }]}
            />
            <Animated.View
                style={[styles.circle, circleAnimationStyle, { top: 200, right: 50 }]}
            />

            {/* Encabezado animado */}
            <Animated.View style={animatedHeaderStyle}>
                <Text style={styles.mainTitle}>
                    ¡
                    {userProfile
                        ? `${userProfile.title}, Juan Pérez`
                        : "Cargando plan personalizado..."}
                </Text>
            </Animated.View>

            {/* Tarjeta de crédito 3D */}
            <AdvancedCreditCard3D />

            {/* Detalles del plan financiero */}
            {userProfile && (
                <View style={styles.card}>
                    <Text style={styles.creditLimit}>
                        Límite de crédito: {userProfile.creditLimit}
                    </Text>
                    <Text style={styles.interestRate}>
                        Tasa de interés: {userProfile.interestRate}
                    </Text>
                    <Text style={styles.cashback}>
                        Cashback: {userProfile.cashback}
                    </Text>
                    <Text style={styles.description}>{userProfile.description}</Text>
                </View>
            )}

            {/* Botón para obtener la tarjeta */}
            <Button
                mode="contained"
                onPress={handleContinue}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                style={styles.continueButton}
            >
                ¡Obtén tu tarjeta ahora!
            </Button>

            {/* Efecto de confeti */}
            {confettiVisible && (
                <ConfettiCannon count={200} origin={{ x: width / 2, y: -10 }} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#d32f2f',
        marginBottom: 20,
    },
    circle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(211, 47, 47, 0.2)',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: width * 0.85,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5, // Para sombras en Android
        alignItems: 'center',
    },
    creditLimit: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    interestRate: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    cashback: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    continueButton: {
        backgroundColor: '#d32f2f',
        borderRadius: 8,
        marginTop: 30,
        width: width * 0.8,
    },
    buttonContent: {
        paddingVertical: 12,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AnalysisResult;