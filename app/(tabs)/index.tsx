import Topbar from "@/components/topbar";
import {Checkbox, Fab, Grid, List} from "@/components";
import {router} from "expo-router";
import {ItemInterface} from "@/interfaces/Item";
import {select} from "@/services/database";
import {useEffect, useState} from "react";
import {IconButton} from "react-native-paper";

export default function Home() {
    const [data, setData] = useState<Array<ItemInterface>>([]);

    const loadData = async () => {
        const d: Array<ItemInterface> = await select("item", ["uid", "title", "description"], "", true);
        if (d.length > 0) {
            setData(d.map((item) => {
                return {
                    uid: item.uid,
                    description: item.DESCRIPTION,
                    title: item.TITLE
                }
            }))
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
                    <Topbar title="Dashboard" />
                </Grid>
                <Grid>
                    {
                        data.length > 0 ?
                            data.map((d: ItemInterface, index: number) => {
                                return <List
                                            title={d.title}
                                            description={d.description}
                                            left={() => <Checkbox/>}
                                            right={() => <IconButton
                                                            onPress={() => {
                                                                router.push({ pathname: "/form", params: { uid: d.uid }})
                                                            }}
                                                            icon="pencil"
                                                        />}
                                        />
                            })
                            : null
                    }
                </Grid>
                <Fab
                    icon="plus"
                    onPress={() => {
                        router.push('form');
                    }}
                    style={{
                        bottom: 20,
                        position: 'absolute',
                        borderRadius: 200,
                        right: 20,
                    }}
                />
            </Grid>;
}