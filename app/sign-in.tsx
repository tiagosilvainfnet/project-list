import {ScrollView, Text, View} from "react-native";
import {Button} from "react-native-paper";
import {Link, router} from "expo-router";
import React, {useEffect, useState} from "react";
import {useSession} from "@/app/ctx";
import {Avatar, TextInput} from "@/components";

// @ts-ignore
const SignIn = () => {
    const { signIn } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <ScrollView>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                }}>
                    <View style={{
                        width: '100%',
                        marginTop: 100,
                        ...styles.container
                    }}>
                        <Avatar size={200} source={require('../assets/images/logo.jpg')}/>
                    </View>
                    <View style={{
                        width: '100%',
                        textAlign: 'center',
                        ...styles.padding,
                        ...styles.container
                    }}>
                        <Text style={{
                            fontSize: 24
                        }}>Seja bem-vindo!</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        ...styles.padding
                    }}>
                        <TextInput
                            keyboardType="email-address"
                            label="E-mail"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        ...styles.padding
                    }}>
                        <TextInput
                            label="Senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        textAlign: 'center',
                        ...styles.container
                    }}>
                        <Link href="register">Cadastrar</Link>
                    </View>
                    <View style={{
                        width: '100%',
                        ...styles.padding
                    }}>
                        <Button mode="contained" onPress={signIn}>
                            Entrar
                        </Button>
                    </View>
                </View>
            </ScrollView>
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16
    }
}

export default SignIn;