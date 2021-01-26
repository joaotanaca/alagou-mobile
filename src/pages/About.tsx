import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

const pages: React.FC = () => {
    return (
        <View>
            <List.Item
                title="Nome"
                description="Alagou!"
                left={(props) => (
                    <List.Icon {...props} icon="cellphone-android" />
                )}
            />
            <List.Item
                title="Versão"
                description="Alpha-0.1"
                left={(props) => <List.Icon {...props} icon="tune-vertical" />}
            />
        </View>
    );
};

export default pages;
