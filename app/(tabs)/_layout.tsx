import {Redirect, Tabs} from 'expo-router';
import React from 'react';

import Ionicons from "@expo/vector-icons/Ionicons";
import {useSession} from "@/app/ctx";
import {Text} from "react-native";
import {useTheme} from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();
  const { session, isLoading } = useSession();

  if(isLoading){
      return <Text>Loading...</Text>;
  }
  if(!session){
      return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
            backgroundColor: theme.colors.background,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={28} style={[{ marginBottom: -3 }]} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="dashboard"
            options={{
                title: 'Report',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name="analytics-outline" size={28} style={[{ marginBottom: -3 }]} color={color} />
                ),
            }}
        />

        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name="person" size={28} style={[{ marginBottom: -3 }]} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
