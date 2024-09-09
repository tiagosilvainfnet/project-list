import Topbar from "@/components/topbar";
import {Fab, Grid} from "@/components";
import {router} from "expo-router";

export default function Home() {
    return  <Grid style={{
        height: '100%',
        width: '100%'
    }}>
                <Grid>
                    <Topbar title="Dashboard" />
                </Grid>
                <Grid></Grid>
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