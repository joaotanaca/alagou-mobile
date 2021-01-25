import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import mapMarker from "../images/map-marker-a.png";
import api from "../services/api";
import { GlobalState } from "../utils/interfaces/redux";
import strings from "../utils/strings/routes";
import { TextInput } from "react-native-paper";

interface FloodingsItem {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const FloodingsMap: React.FC = () => {
    //Declarações
    const navigation = useNavigation();
    const { location: reduxLocation, user } = useSelector(
        (state: GlobalState) => state,
    );
    const [Floodings, setFloodings] = useState<FloodingsItem[]>([]);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [{ userLocation, traffic }, setActions] = useState({
        userLocation: false,
        traffic: false,
    });
    const actions = [
        {
            text: `Tráfego ${traffic ? "ativo" : "desativado"} `,
            icon: <Icon name="traffic" size={24} color={"#FFF"} />,
            name: "button_traffic",
            buttonSize: 50,
            color: traffic ? "#3CDC8C" : "#db0e3b",
        },
        {
            text: `Sua localização no mapa está ${
                userLocation ? "ativa" : "desativada"
            } `,
            icon: <Icon name="person-pin-circle" size={24} color={"#FFF"} />,
            name: "button_user_location",
            buttonSize: 50,
            color: userLocation ? "#3CDC8C" : "#db0e3b",
        },
        {
            text: "Adicionar ponto de favoritos",
            icon: <Icon name="favorite" size={24} color={"#FFF"} />,
            name: "button_favorite",
            buttonSize: 50,
            color: "#0086c3",
        },
        {
            text: "Criar um ponto de alagamento",
            icon: <Icon name="add-location" size={24} color={"#FFF"} />,
            name: "button_flootings",
            buttonSize: 50,
            color: "#0086c3",
        },
        {
            text: user?.name ?? "Logue-se ou cadastre-se",
            icon: (
                <TextInput.Icon
                    name={user?.name ? "account-circle" : "login"}
                    size={24}
                    color={"#FFF"}
                    onPress={() =>
                        navigation.navigate(
                            user?.name
                                ? strings.selectMapPosition
                                : strings.login,
                        )
                    }
                />
            ),
            name: "button_user",
            buttonSize: 50,
            color: "#0086c3",
        },
    ];
    //Funções de efeito
    useFocusEffect(() => {
        api.get("/floodings").then(({ data }) => {
            setFloodings(data);
        });
    });

    useEffect(() => {
        if (!reduxLocation.latitude || !reduxLocation.longitude) {
            (async () => {
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(coords);
            })();
        }
        console.log(user);

        return;
    }, []);

    //Funções
    const handleNavigationToFloodingsDetails = (id: string) => {
        navigation.navigate(strings.floodingsDetails, { id });
    };

    const handleToCreateFloodings = () => {
        console.log(user?.name);
        if (user?.name) navigation.navigate(strings.selectMapPosition);
        else navigation.navigate(strings.login);
    };

    const handleToCreateFloodingsFavorite = () => {
        if (user?.name) navigation.navigate(strings.selectMapPosition);
        else navigation.navigate(strings.login);
    };

    //Render
    return (
        <View style={styles.container}>
            {(reduxLocation?.latitude || location.latitude !== 0) && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: reduxLocation?.latitude ?? location.latitude,
                        longitude:
                            reduxLocation?.longitude ?? location.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    loadingEnabled
                    showsTraffic={traffic}
                    showsUserLocation={userLocation}
                >
                    {Floodings.map((Flooding, index) => (
                        <Marker
                            key={index}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 1.9,
                                y: 0.3,
                            }}
                            coordinate={{
                                latitude: Flooding.latitude,
                                longitude: Flooding.longitude,
                            }}
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
            </View>
            <FloatingAction
                actions={actions}
                onPressItem={(name) => {
                    switch (name) {
                        case "button_flootings": {
                            handleToCreateFloodings();
                        }
                        case "button_favorite": {
                            handleToCreateFloodingsFavorite();
                        }
                        case "button_user_location": {
                            setActions((prev) => ({
                                ...prev,
                                userLocation: !prev.userLocation,
                            }));
                            break;
                        }
                        case "button_traffic": {
                            setActions((prev) => ({
                                ...prev,
                                traffic: !prev.traffic,
                            }));
                            break;
                        }
                    }
                }}
                distanceToEdge={24}
                color="#0086c3"
            />
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
        height: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        justifyContent: "center",
        alignSelf: "flex-start",
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
        bottom: 24,
        backgroundColor: "#fff",
        borderRadius: 30,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 0,
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
