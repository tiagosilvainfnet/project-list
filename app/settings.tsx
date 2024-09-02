import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";
import React from "react";
import {useSession} from "@/app/ctx";
import Topbar from "@/components/topbar";

const SettingsScreen = () => {
    const { signOut } = useSession();

    return  <>
                <Topbar back={true} title="Configurações" menu={false}/>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                    <Button onPress={signOut}>Sair</Button>
                </View>
            </>;
}

export default SettingsScreen;