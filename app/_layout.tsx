import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {isLogged} from "@/services/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    if(isLogged()){
      router.replace('(tabs)');
    }else{
      if(currentRoute !== 'login' && currentRoute !== 'register'){
        router.replace('login');
      }
    }
  }, [loaded]);



  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" initialParams={{
          setCurrentRoute: setCurrentRoute
        }} options={{ headerShown: false }} />
        <Stack.Screen name="register" initialParams={{
          setCurrentRoute: setCurrentRoute
        }} options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" initialParams={{
          setCurrentRoute: setCurrentRoute
        }} options={{ headerShown: false }} />
        <Stack.Screen name="settings" initialParams={{
          setCurrentRoute: setCurrentRoute
        }} />
        <Stack.Screen name="+not-found" initialParams={{
          setCurrentRoute: setCurrentRoute
        }} />
      </Stack>
    </ThemeProvider>
  );
}
