import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import Icon from "react-native-vector-icons/Feather"; // Para los iconos
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FloatingIcon = ({ Icon, color, x, y }) => {
    return (
        <View style={[styles.floatingIcon, { top: y, left: x }]}>
            <Icon name={color} size={24} color={color} />
        </View>
    );
};

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        dispatch(registerUser({ email, password }));  // Despacha la acción de registro
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Floating icons */}
                <FloatingIcon Icon={Icon} color="yellow" x={wp('10%')} y={hp('10%')} />
                <FloatingIcon Icon={Icon} color="pink" x={wp('85%')} y={hp('15%')} />
                <FloatingIcon Icon={Icon} color="blue" x={wp('75%')} y={hp('75%')} />

                {/* Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Join the Fun!</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            inputMode="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <Pressable style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                            <Icon name="chevron-right" size={20} color="white" />
                        </Pressable>
                    </View>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signUpText}>Do You Have an Account? Log In</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(0deg, rgba(255,99,71,1) 0%, rgba(255,105,180,1) 50%, rgba(128,0,128,1) 100%)',
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    floatingIcon: {
        position: 'absolute',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: wp('8%'),
        borderRadius: wp('6%'),
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        backdropFilter: 'blur(10px)', // Similar a backdrop-blur en React
    },
    title: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: hp('3%'),
    },
    form: {
        width: '100%',
        marginBottom: hp('3%'),
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        padding: wp('4%'),
        borderRadius: wp('6%'),
        marginBottom: hp('2%'),
        fontSize: wp('4.5%'),
        borderColor: 'rgba(255, 99, 71, 0.4)',
        borderWidth: 2,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#e11d48',
        padding: wp('4%'),
        borderRadius: wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: wp('2%'),
    },
    signUpText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
