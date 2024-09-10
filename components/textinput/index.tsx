import {HelperText, TextInput as TPi} from "react-native-paper";

const TextInput = (props: any) => {
    return  <>
                <TPi {...props}/>
                <HelperText type='error' visible={props.helpText !== "" && props.helpText !== null && props.helpText !== undefined}>{props.helpText}</HelperText>
            </>
}

export default TextInput;