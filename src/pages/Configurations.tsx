import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logoff } from "../store/actions/user";
import { getFirstLetterName } from "../utils/functions/string";
import { GlobalState } from "../utils/interfaces/redux";
import strings from "../utils/strings/routes";

const Configurations: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const { user } = useSelector((state: GlobalState) => state);
    const theme = {
        colors: {
            primary: "#0086c3",
            background: "#FFF",
            text: "#0086c3",
            placeholder: "#0086c3",
            error: "#db0e3b",
        },
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {user?.name ? (
                    <>
                        <Avatar.Text
                            size={125}
                            label={getFirstLetterName(user.name)}
                            theme={theme}
                        />
                        <Text style={styles.name}>{user.name}</Text>
                    </>
                ) : (
                    <Avatar.Icon icon="account" theme={theme} size={125} />
                )}
            </View>
            <View style={{ flex: 1, paddingTop: 30 }}>
                <Section
                    name={user?.name ? "Sua conta" : "Logue-se"}
                    onPress={() =>
                        navigate.navigate(
                            user?.name
                                ? strings.userInformations
                                : strings.login,
                            {
                                config: !user?.name,
                            },
                        )
                    }
                />
                <Section
                    name={"Sobre"}
                    onPress={() => navigate.navigate(strings.about)}
                />
                {user?.name && (
                    <Section name="Sair" onPress={() => dispatch(logoff())} />
                )}
            </View>
        </View>
    );
};

const Section = ({ name, onPress = () => {} }: any) => {
    return (
        <TouchableOpacity style={section.container} onPress={onPress}>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
    },
    header: {
        width: "100%",
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
        marginTop: 10,
    },
});

const section = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 19,
        paddingTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontFamily: "Nunito_600SemiBold",
    },
});

export default Configurations;
