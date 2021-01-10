import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Location from "expo-location";

import Header from "./components/Header";

import GetLocation from "./pages/LocationUser/GetLocation";
import SearchLocation from "./pages/LocationUser/SearchLocation";
import FloodingsMap from "./pages/FloodingsMap";
import FloodingsDetails from "./pages/FloodingsDetails";
import SelectMapPosition from "./pages/CreateFloodings/SelectMapPosition";
import FloodingsData from "./pages/CreateFloodings/FloodingsData";

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "#f2f3f5" },
                }}
            >
                <Screen name="GetLocation" component={GetLocation} />
                <Screen
                    name="SearchLocation"
                    component={SearchLocation}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header
                                showCancel={false}
                                title="Pesquise uma região"
                            />
                        ),
                    }}
                />
                <Screen name="FloodingsMap" component={FloodingsMap} />
                <Screen
                    name="FloodingsDetails"
                    component={FloodingsDetails}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header
                                showCancel={false}
                                title="Ponto de alagamento"
                            />
                        ),
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />,
                    }}
                />

                <Screen
                    name="FloodingsData"
                    component={FloodingsData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
};

export default Routes;
