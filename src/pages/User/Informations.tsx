import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { useSelector } from "react-redux";
import { GlobalState } from "../../utils/interfaces/redux";

const User: React.FC = () => {
    const { user } = useSelector((state: GlobalState) => state);
    return (
        <View>
            <List.Item
                title="Nome"
                description={user?.name}
                left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
                title="Email"
                description={user.email}
                left={(props) => <List.Icon {...props} icon="email" />}
            />
            <List.Item
                title="Telefone"
                description={user.phone}
                left={(props) => <List.Icon {...props} icon="phone" />}
            />
        </View>
    );
};

export default User;
