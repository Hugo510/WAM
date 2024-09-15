import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles/surveyStyles';

const questions = [
    { id: '1', question: '¿Cuál es tu objetivo principal al usar la app?', options: ['Obtener una base sólida en finanzas', 'Desarrollar habilidades para gestionar mejor mi dinero', 'Aprender a invertir de manera efectiva'] },
    { id: '2', question: '¿Cuál es tu nivel de experiencia en temas financieros?', options: ['No tengo experiencia, soy completamente nuevo', 'Ya tengo algo de experiencia y busco mejorar mis habilidades', 'Soy avanzado y quiero perfeccionar técnicas específicas'] },
    { id: '3', question: '¿Por qué estás interesado en aprender sobre finanzas?', options: ['Para mejorar la gestión de mis finanzas personales', 'Para iniciar un negocio propio', 'Para invertir y hacer crecer mi dinero', 'Por curiosidad y desarrollo personal'] },
    { id: '4', question: '¿Qué tipo de cursos te interesan más?', options: ['Finanzas personales y ahorro', 'Inversiones y mercados financieros', 'Emprendimiento y gestión empresarial'] },
    { id: '5', question: '¿Cuánto tiempo estás dispuesto a dedicar al aprendizaje financiero cada semana?', options: ['Menos de 2 horas', 'Entre 2 y 5 horas', 'Entre 5 y 10 horas', 'Más de 10 horas'] },
];

const SurveyScreen = ({ navigation }) => {
    const route = useRoute();
    const { userName } = route.params;

    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(-1); // Pantalla de bienvenida
    const [buttonVisible, setButtonVisible] = useState(false);
    const [backgroundColor] = useState(new Animated.Value(0)); // Para el degradado de fondo
    const [fadeAnim] = useState(new Animated.Value(0)); // Para animar el saludo
    const [scaleAnim] = useState(new Animated.Value(1)); // Para la animación de escala en el botón de "Finalizar"

    // useEffect para manejar la animación del saludo, siempre se debe ejecutar
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Cambiar la opacidad a 1 (visible)
            duration: 800, // Duración de la animación
            useNativeDriver: true, // Usar el driver nativo para mejor rendimiento
        }).start();
    }, [fadeAnim]);

    // Animar el fondo de rojo a blanco cuando se inicia la encuesta
    const startSurvey = () => {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setCurrentStep(0); // Cambiar al siguiente paso después de la animación
        });
    };

    // Interpolar el color de fondo entre rojo y blanco
    const interpolatedBackgroundColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#d32f2f', '#ffffff'], // Rojo cereza a blanco
    });

    const handleAnswer = (questionId, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option,
        }));
    };

    // Validación: verificar que ambas preguntas en el paso actual estén respondidas
    const areBothQuestionsAnswered = (questionsInStep) => {
        return questionsInStep.every(question => answers[question.id]);
    };

    // Mostrar el botón de siguiente solo si ambas preguntas tienen respuesta
    useEffect(() => {
        if (currentStep >= 0) {  // Asegurar que solo verifiquemos las preguntas después de comenzar la encuesta
            const startIndex = currentStep * 2;
            const questionsToShow = questions.slice(startIndex, startIndex + 2);
            setButtonVisible(areBothQuestionsAnswered(questionsToShow));
        }
    }, [answers, currentStep]);

    const handleNext = () => {
        setButtonVisible(false); // Ocultar el botón antes de la siguiente pregunta

        if ((currentStep + 1) * 2 < questions.length) {
            setCurrentStep(currentStep + 1);
        } else {
            // Mostrar el botón de "Finalizar" en lugar de icono
            navigation.navigate('AuthStack', { screen: 'Login' });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate('Loading', { answers });
        });
    };

    // Renderizar las preguntas
    const renderQuestion = (item) => (
        <View key={item.id} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            {item.options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[styles.option, answers[item.id] === option ? styles.selectedOption : null]}
                    onPress={() => handleAnswer(item.id, option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    // Mostrar solo el saludo al inicio
    if (currentStep === -1) {
        return (
            <Animated.View style={[styles.container, { backgroundColor: interpolatedBackgroundColor }]}>
                <Animated.View style={[styles.centeredContent, { opacity: fadeAnim }]}>
                    <Text style={styles.greeting}>Hola {userName}, vamos a conocerte mejor:</Text>
                    <TouchableOpacity style={styles.startButton} onPress={startSurvey}>
                        <Text style={styles.buttonText}>Empezar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    }

    // Calcular las preguntas que se deben mostrar por paso
    const startIndex = currentStep * 2;
    const questionsToShow = questions.slice(startIndex, startIndex + 2);

    const totalSteps = Math.ceil(questions.length / 2);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Barra de progreso */}
                <View style={styles.progressBarContainer}>
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <View
                            key={index}
                            style={[styles.progressSegment, index <= currentStep ? styles.activeSegment : styles.inactiveSegment]}
                        />
                    ))}
                </View>

                {/* Preguntas */}
                {questionsToShow.map(renderQuestion)}

                {/* Botones de navegación */}
                <View style={styles.navigationContainer}>
                    {currentStep > 0 && (
                        <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    )}

                    <Animated.View style={{ opacity: buttonVisible ? 1 : 0 }}>
                        {startIndex + 2 >= questions.length ? (
                            <Animated.View style={[styles.finishButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
                                <TouchableOpacity
                                    style={styles.finishButton}
                                    onPressIn={handlePressIn}
                                    onPressOut={handlePressOut}
                                >
                                    <Text style={styles.finishButtonText}>Finalizar</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ) : (
                            <TouchableOpacity style={styles.iconButton} onPress={handleNext} disabled={!buttonVisible}>
                                <Icon name="arrow-forward" size={24} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SurveyScreen;
