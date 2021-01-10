import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Button, Searchbar } from "react-native-paper";
import location from "../../services/location";

const LocationUser: React.FC = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [clearID, setClearID] = useState<NodeJS.Timeout>();
    const [responseResult, setResponseResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const handleSearchText = async () => {
        setLoading(true);
        clearID && clearTimeout(clearID);
        const timeID = setTimeout(async () => {
            const { data } = await location.get("/autocomplete.php", {
                params: {
                    q: searchQuery + (searchQuery !== "" && " brazil"),
                },
            });
            setResponseResult(data);
        }, 200);
        setLoading(false);
        setClearID(timeID);
    };
    useEffect(() => {
        handleSearchText();
    }, [searchQuery]);
    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {loading && (
                <Text style={styles.title}>
                    Aguarde enquanto pesquisamos por regiões
                </Text>
            )}
            {searchQuery !== "" &&
                responseResult.map((region: any) => (
                    <Text key={region.osm_id}>
                        {region.display_name} {"          "}
                    </Text>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
