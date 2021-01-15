import React from "react";
import { Platform, NativeModules, StyleSheet, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    title?: string;
    showCancel?: boolean;
    border?: boolean;
    goHome?: boolean;
}

const { StatusBarManager } = NativeModules;

const Header = ({
    title,
    showCancel = true,
    border = false,
    goHome = false,
}: HeaderProps) => {
    const navigation = useNavigation();
    const HandleBackHomePage = () => {
        navigation.navigate("FloodingsMap");
    };

    return (
        <View
            style={{
                ...styles.container,
                borderBottomWidth: border ? 1 : 0,
                borderColor: "#dde3f0",
            }}
        >
            <BorderlessButton
                onPress={goHome ? HandleBackHomePage : navigation.goBack}
            >
                <Feather name="arrow-left" size={34} color="#29b6f6" />
            </BorderlessButton>

            {title && <Text style={styles.title}>{title}</Text>}

            {showCancel ? (
                <BorderlessButton onPress={HandleBackHomePage}>
                    <Feather name="x" size={34} color="#ff669d" />
                </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFF",
        paddingTop:
            20 +
            (Platform.OS === "ios"
                ? StatusBarManager.getHeight()
                : StatusBarManager.HEIGHT),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontFamily: "Nunito_600SemiBold",
        color: "#000",
        fontSize: 16,
    },
});

export default Header;
