import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Button } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { ActivityIndicator } from "react-native";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated } = useSelector(state => state.user);

    const handleLogin = () => {
        if (email && password) {
            dispatch(loginUser({ email, password }));  // Despachar acción de login con email y password
        } else {
            alert("Please enter both email and password.");
        }
    };

    // Redirigir a 'Home' si el login es exitoso
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Home');  // Redirigir a 'Home' cuando el usuario esté autenticado
        }
    }, [isAuthenticated, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="mail" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your email"
                                        inputMode="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="lock" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                        <Icon name={showPassword ? "eye-off" : "eye"} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {error && <Text style={styles.errorText}>{error}</Text>}
                            {isLoading ? (
                                <ActivityIndicator size="large" color="rgba(255, 69, 58, 1)" />
                            ) : (
                                <Button
                                    title="Log In"
                                    buttonStyle={styles.loginButton}
                                    onPress={handleLogin}
                                />
                            )}
                        </View>
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 99, 71, 1)",
    },
    scrollViewContent: {
        justifyContent: "center",
        alignItems: "center",
        padding: wp('4%'),
    },
    box: {
        width: wp('90%'),
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: wp('6%'),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        overflow: "hidden",
    },
    content: {
        padding: wp('5%'),
    },
    title: {
        fontSize: wp('7%'),
        fontWeight: "bold",
        textAlign: "center",
        color: "rgba(255, 69, 58, 1)",
        marginBottom: hp('3%'),
    },
    form: {
        marginBottom: hp('2%'),
    },
    inputGroup: {
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: wp('4%'),
        fontWeight: "500",
        marginBottom: hp('0.5%'),
        color: "#555",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(255, 99, 71, 0.4)",
        borderRadius: wp('4%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('3%'),
        height: hp('6%'),
    },
    input: {
        flex: 1,
        fontSize: wp('4%'),
    },
    icon: {
        position: "absolute",
        left: wp('3%'),
        fontSize: wp('5%'),
        color: "rgba(255, 99, 71, 1)",
    },
    eyeIcon: {
        position: "absolute",
        right: wp('3%'),
    },
    loginButton: {
        backgroundColor: "rgba(255, 69, 58, 1)",
        borderRadius: wp('4%'),
        height: hp('6%'),
    },
    forgotPassword: {
        marginTop: hp('2%'),
        alignItems: "center",
    },
    forgotPasswordText: {
        color: "rgba(255, 99, 71, 1)",
        textDecorationLine: "underline",
    },
    footer: {
        backgroundColor: "rgba(255, 235, 238, 1)",
        paddingVertical: hp('2%'),
        alignItems: "center",
    },
    signUpText: {
        color: "rgba(255, 69, 58, 1)",
        fontWeight: "bold",
    },
});
