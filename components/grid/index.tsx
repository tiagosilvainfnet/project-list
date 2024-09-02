import {View} from "react-native";

const Grid = (props: any) => {
    return <View style={{
        width: '100%',
        ...props.style,
    }}>
        {props.children}
    </View>
}

export default Grid;