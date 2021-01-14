import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/Header";

import FloodingsMap from "./pages/FloodingsMap";
import FloodingsDetails from "./pages/FloodingsDetails";
import GetLocation from "./pages/LocationUser/GetLocation";
import SearchLocation from "./pages/LocationUser/SearchLocation";
import SelectMapPosition from "./pages/CreateFloodings/SelectMapPosition";
import FloodingsData from "./pages/CreateFloodings/FloodingsData";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";

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
                <Screen name="Login" component={Login} />
                <Screen name="GetLocation" component={GetLocation} />
                <Screen
                    name="FloodingsMap"
                    component={FloodingsMap}
                    initialParams={{ coords: {} }}
                />
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
