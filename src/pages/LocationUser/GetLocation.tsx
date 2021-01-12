import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Colors } from "react-native-paper";

const LocationUser: React.FC = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const requestLocation = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            const { gpsAvailable } = await Location.getProviderStatusAsync();
            !loading && setLoading(true);
            if (!gpsAvailable) {
                await Permissions.askAsync(Permissions.LOCATION);
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                navigation.navigate("FloodingsMap", { coords });
            }
            if (!!gpsAvailable && status === "granted") {
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                navigation.navigate("FloodingsMap", { coords });
            }
        } catch (err) {
            setLoading(false);
        }
    };
    const handleNavigateToSearchLocation = () => {
        navigation.navigate("SearchLocation");
    };

    useEffect(() => {
        requestLocation();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Falta pouco para o utilizar o Alagou!
            </Text>
            <Text style={styles.title}>
                {loading
                    ? `Aguarde enquanto fazemos algumas configurações`
                    : `Por favor libere o acesso ou Digite uma localização para podermos saber o alagamento proximo á você`}
            </Text>
            <View style={styles.view_getLocation}>
                {loading ? (
                    <ActivityIndicator
                        animating={true}
                        color={Colors.blue500}
                    />
                ) : (
                    <>
                        <Button
                            icon="map-marker-multiple"
                            mode="contained"
                            color="#29b6f6"
                            contentStyle={buttonStyles.container}
                            labelStyle={buttonStyles.label}
                            onPress={requestLocation}
                        >
                            Liberar o acesso
                        </Button>
                        <Text style={{ ...styles.title, marginVertical: 10 }}>
                            ou
                        </Text>
                        <Button
                            icon="map-search-outline"
                            mode="contained"
                            color="#29b6f6"
                            contentStyle={buttonStyles.container}
                            labelStyle={buttonStyles.label}
                            onPress={handleNavigateToSearchLocation}
                        >
                            Pesquisar região
                        </Button>
                    </>
                )}
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
        color: "#FFf",
    },
});

export default LocationUser;
