import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React, {useEffect} from "react";
import {useSession} from "@/app/ctx";

// @ts-ignore
const SignIn = () => {
    const { signIn } = useSession();

    return <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                <Button onPress={signIn}>Login</Button>
           </View>
}

export default SignIn;