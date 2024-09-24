// @ts-nocheck
import {ScrollView, Text, View} from "react-native";
import {Button} from "react-native-paper";
import {Link} from "expo-router";
import React, {useEffect, useState} from "react";
import {useSession} from "@/app/ctx";
import {Avatar, TextInput} from "@/components";
import Snackbar from "@/components/snackbar";
import {createTables, dropTables} from "@/services/database";

const SignIn = () => {
    const { signIn } = useSession();
    const [email, setEmail] = useState('tiago@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [helpData, setHelpData] = useState({
        email: null,
        password: null
    })

    const verifyFields = (text: string, name: string) => {
        setHelpData((v: any) => ({
            ...v,
            [name]: text.length === 0 ? `O Campo de ${name} é obrigatório` : null
        }))
    }

    const initDatabase = async () => {
        await dropTables();
        await createTables();
    }

    useEffect(() => {
        initDatabase();
    }, []);


    return <>
            <ScrollView>
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
                                onChangeText={(text: string) => {
                                    setEmail(text);
                                    verifyFields(text, "email");
                                }}
                                helpText={helpData.email}
                                error={helpData.email !== null}
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
                                onChangeText={(text: string) => {
                                    setPassword(text);
                                    verifyFields(text, "password");
                                }}
                                helpText={helpData.password}
                                error={helpData.password !== null}
                            />
                        </View>
                        <View style={{
                            width: '100%',
                            textAlign: 'center',
                            ...styles.container
                        }}>
                            <Link href="sign-up">Cadastrar</Link>
                        </View>
                        <View style={{
                            width: '100%',
                            ...styles.padding
                        }}>
                            <Button mode="contained" onPress={() => {
                                setLoading(true);

                                if(email.length > 0 && password.length > 0) {
                                    try {
                                        signIn(email, password);
                                    } catch (err) {
                                        if (e.toString().indexOf("(auth/invalid-credential)")) {
                                            setMessage("Dados de usuário incorretos.")
                                        }else {
                                            setMessage(e.toString())
                                        }
                                    }
                                }else {
                                    setMessage("Os campos e-mail e senha são obrigatório.");
                                    verifyFields(email, "email");
                                    verifyFields(password, "password");
                                }
                                setLoading(false)
                            }}>
                                Entrar
                            </Button>
                        </View>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={message !== null}
                    text={message}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            setMessage(null);
                        },
                    }}
                />
            </>
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