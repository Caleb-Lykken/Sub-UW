import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';

export default function TabLayout() {
    // check if user is authenticated
    // if not, redirect to Signin
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         return <Stack />;
    //     } else {
    //         return <Redirect href="/Signin" />;
    //     }
    //   });

const colorScheme = useColorScheme();

return (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute',
        },
        default: {},
      }),
    }}> 
    <Tabs.Screen
      name="FindSublet"
      options={{title: 'Find'}}
    />
    <Tabs.Screen
      name="PostSublet"
      options={{title: 'Post'}}
    />
    <Tabs.Screen
      name="EditProfile"
      options={{title: 'Profile'}}
    />
    
  </Tabs>
  );
};