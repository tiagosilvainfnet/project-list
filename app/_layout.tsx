import { Slot } from 'expo-router';
import { SessionProvider } from './ctx';
import { PaperProvider } from 'react-native-paper';
import {useColorScheme} from "react-native";
import {darkTheme,lightTheme} from "@/constants/Theme";

export default function Root() {
  const theme = useColorScheme();

  return (
      <PaperProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <SessionProvider>
            <Slot />
          </SessionProvider>
      </PaperProvider>
  );
}
