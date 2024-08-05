import {Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React, {useEffect} from "react";

// @ts-ignore
const LoginScreen = () => {
    const login = () => {
        router.navigate('(tabs)');
    }

    return  <Text>
        <Button onPress={login}>Login</Button>
    </Text>
}

export default LoginScreen;