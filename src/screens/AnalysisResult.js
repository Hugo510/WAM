import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AnalysisResult = () => {
    const route = useRoute();
    const { result } = route.params; // Recibe los resultados del análisis

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados del Análisis</Text>
            <Text style={styles.resultText}>{result}</Text>
        </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default AnalysisResult;
