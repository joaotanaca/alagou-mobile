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
import route_strings from "./utils/strings/routes";
import strings from "./utils/strings/routes";
import Configurations from "./pages/Configurations";

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
                <Screen
                    name={route_strings.getLocation}
                    component={GetLocation}
                />
                <Screen
                    name={route_strings.floodingsMap}
                    component={FloodingsMap}
                    initialParams={{ coords: {} }}
                />
                <Screen
                    name={route_strings.login}
                    component={Login}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} goHome />,
                    }}
                />
                <Screen
                    name={route_strings.signup}
                    component={Signup}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} />,
                    }}
                />
                <Screen
                    name={route_strings.floodingsDetails}
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
                    name={route_strings.searchLocation}
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
                    name={route_strings.selectMapPosition}
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header title="Selecione no mapa" goHome />
                        ),
                    }}
                />

                <Screen
                    name={route_strings.floodingsData}
                    component={FloodingsData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />,
                    }}
                />
                <Screen
                    name={strings.configurations}
                    component={Configurations}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} />,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
};

export default Routes;
