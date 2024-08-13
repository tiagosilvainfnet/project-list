import {Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";

// @ts-ignore
const SignUp = ({ route }) => {

    const register = () => {
        router.navigate('(tabs)');
    }

    return  <Text>
        <Button onPress={register}>Cadastrar</Button>
    </Text>
}

export default SignUp;