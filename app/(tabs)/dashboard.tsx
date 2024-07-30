import {Appbar} from "react-native-paper";
import {router} from "expo-router";

export default function TabTwoScreen() {
  return (
      <Appbar.Header>
        <Appbar.Content title="Dashboard" />
          <Appbar.Action icon={'dots-vertical'} onPress={() => {
              router.push('settings')
          }} />
      </Appbar.Header>
  );
}