import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    scrollViewContent: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d32f2f',
        textAlign: 'center',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 30,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    option: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedOption: {
        backgroundColor: '#d32f2f',
        borderColor: '#d32f2f',
    },
    optionText: {
        color: '#333',
        fontSize: 16,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    iconButton: {
        backgroundColor: '#d32f2f',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    finishButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    finishButton: {
        backgroundColor: '#ff5252', // Más vibrante que el rojo cereza
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
        elevation: 4, // Para Android
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    progressSegment: {
        flex: 1,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeSegment: {
        backgroundColor: '#d32f2f',
    },
    inactiveSegment: {
        backgroundColor: '#eee',
    },
});
