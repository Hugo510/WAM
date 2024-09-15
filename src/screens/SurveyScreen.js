import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles/surveyStyles';

const questions = [
    { id: '1', question: '¿Cuál es tu sexo?', key: 'gender', options: ['Masculino', 'Femenino', 'Prefiero no decirlo'] },
    { id: '2', question: '¿Cuál es tu fecha de nacimiento?', key: 'birthDate', options: [''] }, // Pregunta abierta con date picker
    { id: '3', question: '¿Para qué planeas usar la tarjeta?', key: 'cardUsage', options: ['Compras diarias o gastos personales', 'Ahorro e inversión', 'Viajes o compras internacionales'] },
    { id: '4', question: '¿Cuál es tu ingreso mensual aproximado?', key: 'income', options: ['Menos de $10,000 MXN', 'Entre $10,000 y $30,000 MXN', 'Más de $30,000 MXN'] },
    { id: '5', question: '¿Te interesan más las recompensas o los descuentos?', key: 'rewardsPreference', options: ['Recompensas o puntos por compras', 'Descuentos en comercios', 'Promociones especiales o meses sin intereses'] },
    { id: '6', question: '¿Te preocupa pagar comisiones o anualidades?', key: 'commissionsConcern', options: ['Sí, prefiero evitar comisiones', 'No me importa si los beneficios valen la pena', 'Depende del costo de la anualidad'] },
    { id: '7', question: '¿Con qué frecuencia usarás la tarjeta?', key: 'cardUsageFrequency', options: ['A diario', 'Semanalmente', 'Solo en ocasiones específicas'] },
    { id: '8', question: '¿Te interesa tener seguros incluidos como protección contra fraudes o robos?', key: 'insuranceInterest', options: ['Sí, protección contra fraudes es importante', 'Sí, me interesan otros seguros como vida o salud', 'No, no me interesa'] },
    { id: '9', question: '¿Prefieres una cuenta digital o física?', key: 'accountPreference', options: ['Prefiero una cuenta 100% digital', 'Prefiero acudir a una sucursal física', 'No tengo preferencia'] },
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
    const [date, setDate] = useState(new Date()); // Estado para la fecha
    const [showPicker, setShowPicker] = useState(false); // Controla cuándo se muestra el DateTimePicker

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

    const handleAnswer = (questionKey, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionKey]: option,
        }));
    };

    // Manejar la selección de la fecha
    // Función corregida para manejar el cambio de fecha
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios'); // Ocultar el picker después de seleccionar una fecha en Android
        setDate(currentDate);
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            'birthDate': currentDate.toLocaleDateString(), // Clave corregida
        }));
    };

    // Validación: verificar que ambas preguntas en el paso actual estén respondidas
    const areBothQuestionsAnswered = (questionsInStep) => {
        return questionsInStep.every(question => answers[question.key]);
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
            // Mostrar el botón de "Finalizar" y enviar las respuestas
            navigation.navigate('Loading', { answers }); // Redirigir a la pantalla de loading con las respuestas
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
            {/* Condición especial para la pregunta abierta con DatePicker */}
            {item.id === '2' ? (
                <>
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.optionText}>
                            {answers[item.key] ? `Fecha seleccionada: ${answers[item.key]}` : 'Selecciona tu fecha de nacimiento'}
                        </Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()} // Evitar fechas futuras
                        />
                    )}
                </>
            ) : (
                item.options.map(option => (
                    <TouchableOpacity
                        key={option}
                        style={[styles.option, answers[item.key] === option ? styles.selectedOption : null]}
                        onPress={() => handleAnswer(item.key, option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))
            )}
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
