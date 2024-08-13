import {Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React from "react";
import {useSession} from "@/app/ctx";

const SettingsScreen = () => {
    const { signOut } = useSession();

    return  <Text>
        <Button onPress={signOut}>Sair</Button>
    </Text>
}

export default SettingsScreen;