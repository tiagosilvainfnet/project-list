import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';
import { Text } from 'react-native';

export default function HomeScreen() {
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Home" />
                <Appbar.Action icon={'dots-vertical'} onPress={() => {
                    router.push('settings')
                }} />
            </Appbar.Header>
            <Text>HomeScreen</Text>
        </>
    );
}