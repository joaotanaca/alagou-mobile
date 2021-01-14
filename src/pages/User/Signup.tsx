import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import route_strings from "../../utils/strings/routes";

// import { Container } from './styles';

const User: React.FC = () => {
    const navigate = useNavigation();
    const theme = {
        colors: {
            primary: "#0086c3",
            background: "#FFF",
            text: "#0086c3",
            placeholder: "#0086c3",
        },
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criação de Conta</Text>
            <Text style={styles.subtitle}>Crie uma nova conta</Text>
            <View style={styles.inputsContainer}>
                <TextInput
                    label="Nome"
                    keyboardType="default"
                    left={<TextInput.Icon name="account" color="#0086c3" />}
                    style={styles.input}
                    theme={theme}
                />
                <TextInput
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon name="email" color="#0086c3" />}
                    style={styles.input}
                    theme={theme}
                />
                <TextInput
                    label="Celular"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
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
                    left={<TextInput.Icon name="lock" color="#0086c3" />}
                    style={styles.input}
                    theme={theme}
                />
                <TextInput
                    label="Confirmar senha"
                    secureTextEntry={true}
                    left={<TextInput.Icon name="lock" color="#0086c3" />}
                    style={styles.input}
                    theme={theme}
                />
                <Button
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                    contentStyle={buttonStyles.container}
                    labelStyle={buttonStyles.label}
                    style={{ marginTop: 15 }}
                >
                    Login
                </Button>
            </View>
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 42,
        fontFamily: "Nunito_700Bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 20,
        color: "#a7c0cd",
        fontFamily: "Nunito_600SemiBold",
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
