import Topbar from "@/components/topbar";
import {Avatar, Button, Card, Checkbox, Fab, List} from "@/components";
import {useState} from "react";

export default function Home() {
    const [state, setState] = useState({ open: false });
    // @ts-ignore
    const onStateChange = ({ open }) => setState({ open });
    const [checked, setChecked] = useState(false);

    return  <>
                <Topbar title="Home"/>
                <Avatar source={require("../../assets/images/react-logo.png")}/>
                <Avatar icon="folder" bgColor="#333" />
                <Avatar label="TS" bgColor="#333" color="#fff"/>
                <Card
                    title="Card title" texts={[
                    {"text": "Text 1"}, {"text": "Text 2"}
                ]} buttons={[{label: 'Button', props: {mode: 'contained'}}]}/>
                <List
                    left={(props: any) => <Checkbox status={checked ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        setChecked(!checked);
                                                    }}/>}
                    title="First Item"
                    description="Item description"/>
                <Checkbox status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                              setChecked(!checked);
                          }}
                          labelRight={"Um texto aqui"}/>

                <Fab
                    style={{
                        position: 'absolute',
                        margin: 16,
                        left: 0,
                        bottom: 0,
                    }}
                    icon="plus" onPress={() => {}}/>
                <Fab
                    open={state.open}
                    visible
                    icon={state.open ? 'calendar-today' : 'plus'}
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 0,
                    }}
                    actions={[
                        { icon: 'plus', onPress: () => console.log('Pressed add') },
                        {
                            icon: 'star',
                            label: 'Star',
                            onPress: () => console.log('Pressed star'),
                        },
                        {
                            icon: 'email',
                            label: 'Email',
                            onPress: () => console.log('Pressed email'),
                        },
                        {
                            icon: 'bell',
                            label: 'Remind',
                            onPress: () => console.log('Pressed notifications'),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (state.open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </>;
}