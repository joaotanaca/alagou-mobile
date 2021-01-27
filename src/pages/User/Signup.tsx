import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import route_strings from "../../utils/strings/routes";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/user";
import strings from "../../utils/strings/routes";

const User: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const route = useRoute().params as { config: boolean };
    const theme = {
        colors: {
            primary: "#0086c3",
            background: "#FFF",
            text: "#0086c3",
            placeholder: "#0086c3",
        },
    };

    const handleSubmit = async () => {
        const data = {
            name,
            email,
            phone,
            password,
        };
        api.post("/user/create", data)
            .then(({ data }) => {
                dispatch(login(data));
                navigate.navigate(
                    !!route?.config
                        ? strings.configurations
                        : strings.selectMapPosition,
                );
            })
            .catch((err) => {
                alert(JSON.stringify(err.response.data));
            });
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <Text style={styles.title}>Criação de Conta</Text>
                <Text style={styles.subtitle}>Crie uma nova conta</Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        label="Nome"
                        keyboardType="default"
                        value={name}
                        onChangeText={setName}
                        left={<TextInput.Icon name="account" color="#0086c3" />}
                        style={styles.input}
                        theme={theme}
                    />
                    <TextInput
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon name="email" color="#0086c3" />}
                        style={styles.input}
                        theme={theme}
                    />
                    <TextInput
                        label="Celular"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        value={phone}
                        onChangeText={setPhone}
                        left={
                            <TextInput.Icon
                                name="cellphone-android"
                                color="#0086c3"
                            />
                        }
                        style={styles.input}
                        theme={theme}
                    />

                    <TextInput
                        label="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        left={<TextInput.Icon name="lock" color="#0086c3" />}
                        style={styles.input}
                        theme={theme}
                    />
                    <TextInput
                        label="Confirmar senha"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        left={<TextInput.Icon name="lock" color="#0086c3" />}
                        style={styles.input}
                        theme={theme}
                    />
                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        contentStyle={buttonStyles.container}
                        labelStyle={buttonStyles.label}
                        style={{ marginTop: 15 }}
                    >
                        Cadastrar
                    </Button>
                </View>
            </KeyboardAvoidingView>
            <View style={redirectSignup.container}>
                <Text style={styles.textSignup}>Já tem conta?</Text>
                <Button
                    compact
                    uppercase={false}
                    labelStyle={redirectSignup.label}
                    onPress={() => navigate.navigate(route_strings.login)}
                    theme={theme}
                >
                    faça login
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 42,
        fontFamily: "Nunito_700Bold",
        color: "#000",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "#a7c0cd",
        fontFamily: "Nunito_600SemiBold",
        textAlign: "center",
    },
    inputsContainer: {
        marginVertical: 30,
        width: "100%",
    },
    input: {
        marginBottom: 15,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 10,
    },
    textSignup: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 16,
    },
});

const buttonStyles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "#0086c3",
    },
    label: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
        color: "#FFf",
    },
});

const redirectSignup = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 16,
        color: "#0086c3",
    },
});

export default User;
