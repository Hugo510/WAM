import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
    { id: '1', question: '¿Cuál es tu objetivo principal al usar la app?', options: ['Obtener una base sólida en finanzas', 'Desarrollar habilidades para gestionar mejor mi dinero', 'Aprender a invertir de manera efectiva'] },
    { id: '2', question: '¿Cuál es tu nivel de experiencia en temas financieros?', options: ['No tengo experiencia, soy completamente nuevo', 'Ya tengo algo de experiencia y busco mejorar mis habilidades', 'Soy avanzado y quiero perfeccionar técnicas específicas'] },
    { id: '3', question: '¿Por qué estás interesado en aprender sobre finanzas?', options: ['Para mejorar la gestión de mis finanzas personales', 'Para iniciar un negocio propio', 'Para invertir y hacer crecer mi dinero', 'Por curiosidad y desarrollo personal'] },
    { id: '4', question: '¿Qué tipo de cursos te interesan más?', options: ['Finanzas personales y ahorro', 'Inversiones y mercados financieros', 'Emprendimiento y gestión empresarial'] },
    { id: '5', question: '¿Cuánto tiempo estás dispuesto a dedicar al aprendizaje financiero cada semana?', options: ['Menos de 2 horas', 'Entre 2 y 5 horas', 'Entre 5 y 10 horas', 'Más de 10 horas'] },
];

const SurveyScreen = ({ navigation }) => {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (questionId, option) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: option
        }));
    };

    const handleFinish = () => {
        navigation.navigate('AuthStack', { screen: 'Login' });
    };          

    const renderQuestion = (item) => (
        <View key={item.id} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            {item.options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[
                        styles.option,
                        answers[item.id] === option ? styles.selectedOption : null,
                    ]}
                    onPress={() => handleAnswer(item.id, option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {questions.map(renderQuestion)}

                <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                    <Text style={styles.buttonText}>Finalizar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    scrollViewContent: {
        padding: 20,
        paddingBottom: 100, // Espacio para el botón
    },
    questionContainer: {
        marginBottom: 30,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    option: {
        backgroundColor: '#eee',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#007bff',
    },
    optionText: {
        color: '#333',
    },
    finishButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SurveyScreen;
