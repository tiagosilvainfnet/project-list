import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
