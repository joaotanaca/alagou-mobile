import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { getFirstLetterName } from "../utils/functions/string";
import { GlobalState } from "../utils/interfaces/redux";
// import { Container } from './styles';

const Configurations: React.FC = () => {
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
                        />
                        <Text style={styles.name}>{user.name}</Text>
                    </>
                ) : (
                    <Avatar.Icon icon="account" theme={theme} size={125} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
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
export default Configurations;
