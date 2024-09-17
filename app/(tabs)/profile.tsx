import Topbar from "@/components/topbar";
import {Avatar, Camera, Fab, Grid, TextInput} from "@/components";
import {ScrollView, View} from "react-native";
import {Button} from "react-native-paper";
import React, {useEffect, useRef, useState} from "react";
import {pickImage} from "@/services/photo";
import {select} from "@/services/database";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const cameraRef = useRef(null);
    const [user, setUser] = useState<any>({
        uid: null,
        emailVerified: null,
        username: null,
        displayName: null,
        email: null,
        photoURL: null,
        phoneNumber: null,
    });

    const loadData = async () => {
        const data = await select("user", ["uid", "emailVerified", "username", "displayName", "email", "photoURL", "phoneNumber"], "", false);
        setUser(data)
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log(user)

    return  <Grid>
        <Topbar title="Perfil" />
        <ScrollView>
            <Grid style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                <Grid style={{
                    ...styles.containerImage
                }}>
                    <Grid style={{
                        ...styles.centerImage
                    }}>
                        {
                            user.photoURL ?
                                <Avatar size={230} source={{uri: user.photoURL}}/> :
                                <Avatar size={230} icon="account"/>
                        }
                        <Fab
                            icon={"image"}
                            onPress={async () => {
                                const image = await pickImage(setLoading, false, true);
                                setUser({...user, photoURL: image?.uri});
                            }}
                            style={{
                                ...styles.fab,
                                ...styles.left
                            }}/>
                        <Fab
                            onPress={() => {
                                setCameraVisible(true);
                            }}
                            icon={"camera"}
                            style={{
                                ...styles.fab,
                                ...styles.right
                            }}/>
                    </Grid>
                </Grid>
                <View style={{
                    width: '100%',
                    ...styles.padding
                }}>
                    <TextInput
                        label="Usuário"
                        value={user.username}
                        onChangeText={(text: string) => {
                            setUser({...user, username: text});
                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    ...styles.padding
                }}>
                    <TextInput
                        keyboardType="email-address"
                        label="E-mail"
                        value={user.email}
                        onChangeText={(text: string) => {
                            setUser({...user, email: text});
                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    ...styles.padding
                }}>
                    <TextInput
                        label="Nome"
                        value={user.displayName}
                        onChangeText={(text: string) => {
                            setUser({...user, displayName: text});
                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    ...styles.padding
                }}>
                    <TextInput
                        keyboardType="numeric"
                        label="Telefone"
                        value={user.phoneNumber}
                        onChangeText={(text: string) => {
                            setUser({...user, phoneNumber: text});
                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    ...styles.padding
                }}>
                    <Button
                        loading={loading}
                        mode="contained">
                        Salvar
                    </Button>
                </View>
            </Grid>
        </ScrollView>
        <Camera
            onCapture={async (image: any) => {
                setUser({...user, image: image?.uri});
            }}
            onClose={() => setCameraVisible(false)}
            ref={cameraRef}
            visible={cameraVisible}
        />
    </Grid>;
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    centerImage: {
        width: 230,
        position: 'relative',
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 100
    },
    left: {
        left: 0
    },
    right: {
        right: 0
    }
}