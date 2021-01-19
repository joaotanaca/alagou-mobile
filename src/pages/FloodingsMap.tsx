import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import mapMarker from "../images/map-marker-a.png";
import api from "../services/api";
import { FAB } from "react-native-paper";

interface FloodingsItem {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface FloodingsPropsRoute {
    coords?: {
        latitude?: number;
        longitude?: number;
    };
}

const FloodingsMap: React.FC = () => {
    const navigation = useNavigation();
    const routes = useRoute();
    const { coords } = routes.params as FloodingsPropsRoute;

    const [Floodings, setFloodings] = useState<FloodingsItem[]>([]);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    useFocusEffect(() => {
        api.get("/floodings").then(({ data }) => {
            setFloodings(data);
        });
    });

    useEffect(() => {
        if (!coords?.latitude || !coords?.longitude) {
            (async () => {
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(coords);
            })();
        }
        return;
    }, []);

    const handleNavigationToFloodingsDetails = (id: string) => {
        navigation.navigate("FloodingsDetails", { id });
    };

    const handleToCreateFloodings = () => {
        navigation.navigate("SelectMapPosition");
    };
    return (
        <View style={styles.container}>
            {(coords?.latitude || location.latitude !== 0) && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: coords?.latitude ?? location.latitude,
                        longitude: coords?.longitude ?? location.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    loadingEnabled
                >
                    {Floodings.map((Flooding, index) => (
                        <Marker
                            key={index}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.9,
                            }}
                            coordinate={{
                                latitude: Number(Flooding.latitude),
                                longitude: Number(Flooding.longitude),
                            }}
                            style={{ height: 60 }}
                        >
                            <Callout
                                tooltip
                                onPress={() => {
                                    handleNavigationToFloodingsDetails(
                                        Flooding._id,
                                    );
                                }}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>
                                        {Flooding.name.split(",")[0]}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {Floodings.length} Alagamentos encontrados
                </Text>

                <FAB
                    style={styles.createFloodingsButton}
                    onPress={handleToCreateFloodings}
                    icon="plus"
                    color="#FFF"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    calloutContainer: {
        width: 160,
        height: "auto",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 16,
        justifyContent: "center",
    },

    calloutText: {
        color: "#0086c3",
        fontSize: 14,
        fontFamily: "Nunito_700Bold",
    },

    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: "#fff",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 3,
    },

    footerText: {
        fontFamily: "Nunito_700Bold",
        color: "#0086c3",
    },

    createFloodingsButton: {
        width: 56,
        height: 56,
        backgroundColor: "#29b6f6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default FloodingsMap;
