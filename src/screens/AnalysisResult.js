import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import AdvancedCreditCard3D from '../components/Card3D';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width } = Dimensions.get('window');

const AnalysisResult = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { result, userName } = route.params;

    /* console.log('Result in AnalysisResult:', result); */

    const [confettiVisible, setConfettiVisible] = useState(false);
    const [headerAnim] = useState(new Animated.Value(0));
    const [circles] = useState(new Animated.Value(0));

    useEffect(() => {
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
            // Pasamos los datos necesarios a FinancialPlan
            navigation.navigate('FinancialPlan', {
                userName,
                chatRecommendation: result.chatRecommendation,
                recommendedModule: result.recommendedModule,
            });
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

    if (!result) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando plan personalizado...</Text>
            </View>
        );
    }

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
                    ¡{result.message}, {userName}!
                </Text>
            </Animated.View>

            {/* Tarjeta de crédito 3D */}
            <AdvancedCreditCard3D cardName={result.recommendedCard} />

            {/* Detalles de la tarjeta recomendada */}
            <View style={styles.card}>
                <Text style={styles.creditLimit}>
                    Tarjeta recomendada: {result.recommendedCard}
                </Text>
                <Text style={styles.description}>{result.cardDescription}</Text>
            </View>

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
        elevation: 5,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
    },
});

export default AnalysisResult;
