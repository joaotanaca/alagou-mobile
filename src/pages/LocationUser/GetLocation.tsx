import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const LocationUser: React.FC = () => {
    const navigation = useNavigation();
    const requestLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        const { gpsAvailable } = await Location.getProviderStatusAsync();
        if (status !== "granted" || gpsAvailable) {
            return;
        }
        const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });
        if (coords) {
            navigation.navigate("FloodingsMap", { coords });
        }
    };

    const handleNavigateToSearchLocation = () => {
        navigation.navigate("SearchLocation");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Falta pouco para o utilizar o Alagou!
            </Text>
            <Text style={styles.title}>
                Por favor libere o acesso ou Digite uma localização para
                podermos saber o alagamento proximo á você
            </Text>
            <View style={styles.view_getLocation}>
                <Button
                    icon="map-marker-multiple"
                    mode="contained"
                    color="#000"
                    contentStyle={buttonStyles.container}
                    labelStyle={buttonStyles.label}
                    onPress={requestLocation}
                >
                    Liberar o acesso
                </Button>
                <Text style={{ ...styles.title, marginVertical: 10 }}>ou</Text>
                <Button
                    icon="map-search-outline"
                    mode="contained"
                    color="#000"
                    contentStyle={buttonStyles.container}
                    labelStyle={buttonStyles.label}
                    onPress={handleNavigateToSearchLocation}
                >
                    Pesquisar região
                </Button>
            </View>
        </View>
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
        fontFamily: "Nunito_700Bold",
        fontSize: 24,
    },
    view_getLocation: {
        paddingTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});

const buttonStyles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    label: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
    },
});

export default LocationUser;
