import {Portal, Dialog as Dl} from "react-native-paper";
import {Button, Text} from "@/components";

const Dialog = (props: any) => {
    return  <Portal>
                <Dl visible={props.visible} onDismiss={props.hideDialog}>
                    <Dl.Icon icon={props.icon} />
                    <Dl.Title>{props.title}</Dl.Title>
                    <Dl.Content>
                        <Text variant="bodyMedium">{props.text}</Text>
                    </Dl.Content>
                    <Dl.Actions>
                        {
                            props.actions?.map((action: any, index: number) => {
                                return <Button key={index} onPress={action.onPress}>{action.text}</Button>
                            })
                        }
                    </Dl.Actions>
                </Dl>
            </Portal>
}

export default Dialog;