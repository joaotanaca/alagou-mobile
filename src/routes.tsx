import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/Header";

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
                <Screen name="FloodingsMap" component={FloodingsMap} />

                <Screen
                    name="FloodingsDetails"
                    component={FloodingsDetails}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header showCancel={false} title="Ponto de alagamento" />
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
