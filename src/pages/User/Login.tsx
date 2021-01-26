import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import route_strings from "../../utils/strings/routes";
import Header from "../../components/Header";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/user";
import strings from "../../utils/strings/routes";

// import { Container } from './styles';

const User: React.FC = () => {
    const navigate = useNavigation();
    const route = useRoute().params as { config: boolean };
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();
    const theme = {
        colors: {
            primary: error ? "#db0e3b" : "#0086c3",
            background: "#FFF",
            text: error ? "#db0e3b" : "#0086c3",
            placeholder: error ? "#db0e3b" : "#0086c3",
            error: "#db0e3b",
        },
    };
    const handleLogin = () => {
        api.post("/user/login", data)
            .then(({ data: response }) => {
                dispatch(login(response));
                navigate.navigate(
                    route.config
                        ? strings.configurations
                        : strings.selectMapPosition,
                );
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };
    return (
        <>
            <View style={styles.container}>
                <Avatar.Icon icon="account" theme={theme} size={100} />
                <Text style={styles.title}>
                    {error ? "Algo deu errado" : "Bem vindo"}
                </Text>
                <Text style={styles.subtitle}>
                    {error ?? "Entre para continuar"}
                </Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        left={
                            <TextInput.Icon
                                name="email"
                                color={error ? "#db0e3b" : "#0086c3"}
                            />
                        }
                        style={styles.input}
                        onChangeText={(email) => {
                            if (error) setError(null);
                            setData((prev) => ({ ...prev, email }));
                        }}
                        error={!!error}
                        theme={theme}
                    />
                    <TextInput
                        label="Senha"
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon
                                name="lock"
                                color={error ? "#db0e3b" : "#0086c3"}
                            />
                        }
                        style={styles.input}
                        onChangeText={(password) => {
                            if (error) setError(null);
                            setData((prev) => ({ ...prev, password }));
                        }}
                        error={!!error}
                        theme={theme}
                    />
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        contentStyle={buttonStyles.container}
                        labelStyle={buttonStyles.label}
                        style={{ marginTop: 15 }}
                    >
                        Login
                    </Button>
                </View>
                <View style={redirectSignup.container}>
                    <Text style={styles.textSignup}>Não tem conta?</Text>
                    <Button
                        compact
                        uppercase={false}
                        labelStyle={redirectSignup.label}
                        onPress={() => navigate.navigate(route_strings.signup)}
                        theme={theme}
                    >
                        crie uma conta agora
                    </Button>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 40,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 46,
        fontFamily: "Nunito_700Bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 18,
        color: "#a7c0cd",
        fontFamily: "Nunito_600SemiBold",
    },
    inputsContainer: {
        marginVertical: 40,
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
