import {Redirect, Tabs} from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from "@expo/vector-icons/Ionicons";
import {useSession} from "@/app/ctx";
import {Text} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  if(isLoading){
      return <Text>Loading...</Text>;
  }
  console.log(session)
  if(!session){
      return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>w
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
