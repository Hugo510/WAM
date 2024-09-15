import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const FinancialPlanScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userName, chatRecommendation, recommendedModule } = route.params;

    const [confettiVisible, setConfettiVisible] = useState(false);
    const [headerAnim] = useState(new Animated.Value(0));
    const [circlesAnim] = useState(new Animated.Value(0));

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
                Animated.timing(circlesAnim, { toValue: 1, duration: 5000, useNativeDriver: true }),
                Animated.timing(circlesAnim, { toValue: 0, duration: 5000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const handleStartPlan = () => {
        // Mostrar confeti y redirigir
        setConfettiVisible(true);
        setTimeout(() => {
            navigation.navigate('IDScanScreen'); // Redirigir a la pantalla correspondiente
        }, 1500);
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
        opacity: circlesAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        }),
        transform: [
            {
                translateY: circlesAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Fondo animado con círculos flotantes */}
            <Animated.View style={[styles.circle, circleAnimationStyle, { top: 100, left: 50 }]} />
            <Animated.View style={[styles.circle, circleAnimationStyle, { top: 200, right: 50 }]} />

            {/* Encabezado animado */}
            <Animated.View style={animatedHeaderStyle}>
                <Text style={styles.mainTitle}>
                    ¡{userName}, sigue este plan especialmente para ti!
                </Text>
            </Animated.View>

            {/* Detalles del plan financiero */}
            <View style={styles.planDetailsCard}>
                <Text style={styles.planText}>Módulo sugerido: {recommendedModule}</Text>
                <Text style={styles.planText}>Meta financiera: {chatRecommendation}</Text>
            </View>

            {/* Botón para comenzar el plan */}
            <Button
                mode="contained"
                onPress={handleStartPlan}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                style={styles.startPlanButton}
            >
                ¡Comienza tu plan ahora!
            </Button>

            {/* Efecto de confeti */}
            {confettiVisible && <ConfettiCannon count={200} origin={{ x: width / 2, y: -10 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFCDD2', // Fondo gradiente de blanco a rojo claro
        position: 'relative',
        overflow: 'hidden',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#B71C1C', // Rojo cereza
        marginBottom: 20,
    },
    circle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(183, 28, 28, 0.2)', // Rojo cereza semitransparente
    },
    planDetailsCard: {
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
    planText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#B71C1C', // Texto en rojo cereza
        marginBottom: 10,
    },
    startPlanButton: {
        backgroundColor: '#B71C1C', // Rojo cereza
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

export default FinancialPlanScreen;
