import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { answers } = route.params;

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                // Simular una llamada al backend
                const response = /* await axios.post('https://tu-backend.com/analyze', { answers }); */ 'correct';
                
                // Simula un retraso de 2 segundos antes de mostrar los resultados
                setTimeout(() => {
                    navigation.navigate('AnalysisResult', { result: response/* .data */ });
                }, 2000);
            } catch (error) {
                console.error("Error fetching analysis:", error);
            }
        };

        fetchAnalysis();
    }, [answers, navigation]);

    return (
        <View style={styles.container}>
            <ContentLoader 
                speed={1.5}
                width={width - 40}
                height={160}
                viewBox={`0 0 ${width - 40} 160`}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={styles.loader}
            >
                <Rect x="0" y="10" rx="5" ry="5" width={width - 60} height="20" />
                <Rect x="0" y="40" rx="5" ry="5" width={width - 100} height="20" />
                <Rect x="0" y="70" rx="5" ry="5" width={width - 120} height="20" />
                <Rect x="0" y="100" rx="5" ry="5" width={width - 80} height="20" />
                <Rect x="0" y="130" rx="5" ry="5" width={width - 60} height="20" />
            </ContentLoader>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    loader: {
        marginBottom: 20,
    }
});

export default LoadingScreen;
