import {Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React, {useEffect} from "react";
import {useSession} from "@/app/ctx";

// @ts-ignore
const SignIn = () => {
    const { signIn } = useSession();

    return  <Text>
        <Button onPress={signIn}>Login</Button>
    </Text>
}

export default SignIn;