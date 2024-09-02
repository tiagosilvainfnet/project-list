import {Text} from "react-native";
import {Snackbar as Snk} from "react-native-paper";

// @ts-ignore
const SnackBar = ({ children, ...props }) => {
    // @ts-ignore
    return  <Snk {...props}>
                {children}
            </Snk>
}

export default SnackBar;