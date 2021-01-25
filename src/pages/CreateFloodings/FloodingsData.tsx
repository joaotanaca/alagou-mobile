import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { Button } from "react-native-paper";
import location from "../../services/location";
import { useSelector } from "react-redux";
import { GlobalState } from "../../utils/interfaces/redux";

interface FloodingsDataParams {
    position: {
        latitude: number;
        longitude: number;
    };
}

export default function FloodingsData() {
    const routes = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state: GlobalState) => state);

    const { position } = routes.params as FloodingsDataParams;
    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await location.get("/reverse.php", {
                params: {
                    lat: position.latitude,
                    lon: position.longitude,
                    format: "json",
                },
            });
            setName(data.display_name);
            setLoading(false);
        })();
    }, []);
    const handleCreateFloodings = () => {
        const { latitude, longitude } = position;
        console.log(user.id);
        const data = {
            name,
            note,
            latitude: latitude,
            longitude: longitude,
            user: user.id,
        };
        api.post("/floodings", data)
            .then(() => {
                navigation.navigate("FloodingsMap");
            })
            .catch((err) => {
                return alert(err);
            });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 24 }}
        >
            <Text style={styles.title}>Ponto de alagamento</Text>

            <Text style={styles.label}>Localização</Text>
            <Text style={styles.location_text}>
                {!loading ? name : "Carregando localização..."}
            </Text>

            <Text style={styles.label}>Observações</Text>
            <TextInput
                style={styles.input}
                multiline
                value={note}
                onChangeText={setNote}
                numberOfLines={5}
                placeholder="Digite informações uteis sobre o alagamento no local"
            />
            <Button
                style={styles.nextButton}
                mode="contained"
                onPress={handleCreateFloodings}
                color="#29b6f6"
            >
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    title: {
        color: "#0086c3",
        fontSize: 24,
        fontFamily: "Nunito_700Bold",
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: "#D3E2E6",
    },

    label: {
        color: "#4b636e",
        fontFamily: "Nunito_600SemiBold",
        fontSize: 16,
        marginBottom: 8,
    },
    location_text: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        marginBottom: 32,
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#0086c3",
        height: 100,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: "top",
    },

    nextButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: "Nunito_800ExtraBold",
        fontSize: 16,
        color: "#FFF",
    },
});
