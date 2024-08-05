import {Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React from "react";

const SettingsScreen = () => {
    const logout = () => {
        router.navigate('login');
    }

    return  <Text>
        <Button onPress={logout}>Sair</Button>
    </Text>
}

export default SettingsScreen;