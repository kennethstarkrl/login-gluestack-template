import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

import { useAuth } from '@/hooks/use-auth';

import { useRouter } from 'expo-router';

export default function AuthedLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerRight: () => {
            return (
                <HStack space='md' style={{marginRight:10}}>
                    <Button
                        style={styles.buttons}
                        className="w-fit"
                        size="sm"
                        variant="outline"
                        onPress={handleLogout}
                    >
                        <ButtonText>Logout</ButtonText>
                    </Button>
                </HStack>
            )
        },
      }}>
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />      
    </Tabs>
  );
};

const styles = StyleSheet.create({
    buttons: {
        
    },
});
