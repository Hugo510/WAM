import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SurveyScreen from '../screens/SurveyScreen';
import LoadingScreen from '../screens/LoadingScreen'; // Nueva pantalla de carga
import AnalysisResult from '../screens/AnalysisResult'; // Pantalla de resultados
import FinancialPlanScreen from '../screens/FinancialPlanScreen'; // Importar FinancialPlanScreen
import IDScanScreen from '../screens/IDScanScreen'; 

const Stack = createStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: true,
            gestureEnabled: true,
        }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Survey" component={SurveyScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} /> 
            <Stack.Screen name="AnalysisResult" component={AnalysisResult} />
            <Stack.Screen name="FinancialPlan" component={FinancialPlanScreen} />
            <Stack.Screen name="IDScanScreen" component={IDScanScreen} />
    </Stack.Navigator>
    );
};

export default WelcomeStack;
