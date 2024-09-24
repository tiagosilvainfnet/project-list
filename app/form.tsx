import {Button, Card, Grid, Text, TextInput, SnackBar, Topbar, Dialog} from "@/components";
import {router, useLocalSearchParams} from "expo-router";
import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {IconButton, Surface, useTheme} from "react-native-paper";
import {pickImage} from "@/services/photo";
import {drop, insert, select, update} from "@/services/database";
import {ItemImageInterface, ItemInterface} from "@/interfaces/Item";

const NoImage = () => {
    return  <Grid style={{
                width: '100%',
                height: 300,
                padding: 5,
                position: 'relative'
            }}>
                <Card
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: 2
                    }}
                    source={{uri: 'https://static.vecteezy.com/system/resources/previews/008/695/917/original/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg'}}
                />
                <Text
                    variant="bodyLarge"
                    style={{
                        marginTop: 2,
                        textAlign: 'center',
                    }}>Nenhuma imagem encontrada</Text>
            </Grid>;

}

const FormScreen = () => {
    const theme = useTheme();
    const params = useLocalSearchParams();
    const [cameraVisible, setCameraVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState(null);
    const [imageSelected, setImageSelected] = useState(null);
    const [data, setData] = useState({
        uid: null,
        title: null,
        description: null,
        images: []
    });

    const updateImages = (images: any): void => {
        const currentImages = data.images;

        images.map((image: any) => {
            currentImages.push(image.uri);
        });

        setData((v: any) => ({...v, images: currentImages}));
    }

    const loadData = async () => {
        if (params.uid) {
            const d: ItemInterface = await select("item", ["uid", "title", "description"], `uid='${params.uid}'`, false);
            const i: Array<ItemImageInterface> = await select("item_image", ["uid", "image"], `itemUid='${params.uid}'`, true);

            setData({
                uid: d.uid,
                description: d.DESCRIPTION,
                title: d.TITLE,
                images: i.map((item: ItemImageInterface) => item.image)
            })
        }
    }

    const removeImage = (index: number): void => {
        const currentImages = data.images;
        currentImages.splice(index, 1);
        setData((v: any) => ({...v, images: currentImages}));
    }

    const _update = async () => {
        try {
            let uid = data.uid;
            if (uid) {
                await update("item", {
                    title: data.title,
                    description: data.description
                }, uid, true);

                await drop("item_image", `itemUid='${params.uid}'`)

                for(const image of data.images) {
                    await insert("item_image", {
                        image: image,
                        itemUid: uid
                    }, true)
                }
            } else {
                uid = await insert("item", {
                    title: data.title,
                    description: data.description
                }, true);

                for(const image of data.images) {
                    await insert("item_image", {
                        image: image,
                        itemUid: uid
                    }, true)
                }
            }

            setMessageText(data.uid ? "Dado atualizado com sucesso" : "Dado salvo com sucesso");
            setTimeout(() => {
                router.back();
            }, 2000);
        } catch (err) {
            console.error("Err: ", err)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return  <Grid style={{
                height: '100%',
                width: '100%'
            }}>
                <Grid>
                    <Topbar title={data.uid ? "Editar item" : "Novo item"} back={true} menu={false}/>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Text variant="headlineLarge">{data.uid ? "Editar item" : "Cadastrar item"}</Text>
                </Grid>
                <ScrollView>
                    <Grid style={{
                        ...styles.padding
                    }}>
                        <TextInput
                            label="Título"
                            value={data.title}
                            onChangeText={(text: string) => setData((v: any) => ({...v, title: text}))}
                        />
                    </Grid>
                    <Grid style={{
                        ...styles.padding
                    }}>
                        <TextInput
                            label="Descrição"
                            value={data.description}
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(text: string) => setData((v: any) => ({...v, description: text}))}
                        />
                    </Grid>
                    <Grid style={{
                        ...styles.padding
                    }}>
                        <Text variant="headlineSmall">Galeria:</Text>
                    </Grid>
                    <Grid style={{
                        ...styles.padding,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Grid style={{
                            width: '50%',
                            ...styles.padding
                        }}>
                            <Button
                                mode="contained"
                                style={{
                                    backgroundColor: theme.colors.primary
                                }}
                                onPress={() => {
                                    setCameraVisible(true)
                                }}
                                icon="camera"
                            >
                                Tirar foto
                            </Button>
                        </Grid>
                        <Grid style={{
                            width: '50%',
                            ...styles.padding
                        }}>
                            <Button
                                mode="contained"
                                style={{
                                    backgroundColor: theme.colors.tertiary
                                }}
                                icon="image"
                                onPress={async () => {
                                    const images = await pickImage(setLoading, true, false);
                                    updateImages(images);
                                }}
                            >
                                Galeria
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid style={{
                        ...styles.padding,
                        paddingTop: 0,
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {
                            data.images.length === 0 ?
                                <NoImage /> :
                                data.images.map((image: any, index: number) => {
                                    return  <Grid key={index}
                                                  style={{
                                                      width: '33.33%',
                                                      height: 100,
                                                      padding: 5,
                                                      position: 'relative'
                                                  }}
                                    >
                                        <Card
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                zIndex: 2
                                            }}
                                            source={{uri: image}}
                                        />
                                        <Surface
                                            elevation={2}
                                            style={{
                                                borderRadius: 100,
                                                position: 'absolute',
                                                right: -15,
                                                top: -15,
                                                zIndex: 3,
                                                backgroundColor: '#fff'
                                            }}
                                        >
                                            <IconButton
                                                icon="close"
                                                onPress={() => {
                                                    setDialogVisible(true);
                                                    setImageSelected(index)
                                                }}
                                            />
                                        </Surface>
                                    </Grid>
                                })
                        }
                    </Grid>
                    <Grid style={{
                        ...styles.padding
                    }}>
                        <Button
                            onPress={_update}
                            mode="contained"
                        >{
                            data.uid ? "Editar" : "Salvar"
                        }</Button>
                    </Grid>
                </ScrollView>
                <SnackBar
                    visible={messageText!==null}
                    text={messageText}
                    onDismiss={() => setMessageText(null)}
                />
                <Dialog
                    icon="alert"
                    visible={dialogVisible}
                    setVisible={setDialogVisible}
                    onDismiss={() => {
                        setDialogVisible(false);
                    }}
                    title="Excluir imagem"
                    text="Tem certeza que deseja excluir está imagem?"
                    actions={[
                        {
                            text: "Cancelar",
                            onPress: () => {
                                console.log('Cancelar');
                                setDialogVisible(false);
                                setMessageText("Operação cancelada.");
                                setImageSelected(null);
                            }
                        },
                        {
                            text: "Excluir",
                            onPress: () => {
                                console.log('Excluir');
                                setDialogVisible(false);
                                setMessageText("Imagem excluída.");
                                removeImage(imageSelected);
                                setImageSelected(null);
                            }
                        }
                    ]}
                />
            </Grid>;
}

const styles = {
    padding: {
        padding: 16
    }
}

export default FormScreen;