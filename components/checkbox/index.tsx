import {View} from "react-native";
import {Checkbox as Check, Text} from "react-native-paper";

const Checkbox = (props: any) => {
    return  <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                { props.labelLeft ? <Text onPress={props.onPress}>{props.labelLeft}</Text> : null }
                <Check {...props} />
                { props.labelRight ? <Text onPress={props.onPress}>{props.labelRight}</Text> : null }
            </View>
}

export default Checkbox;