import {Text} from "react-native";
import {Snackbar as Snk} from "react-native-paper";

// @ts-ignore
const SnackBar = (props: any) => {
    // @ts-ignore
    return  <Snk {...props}>
                {props.text}
            </Snk>
}

export default SnackBar;