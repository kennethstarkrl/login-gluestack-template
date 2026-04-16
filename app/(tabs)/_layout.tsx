import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import { ResponsiveDrawerMenu } from '@/components/navigation/responsive-drawer-menu';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 1024;
  const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Drawer
      screenOptions={{
        headerShown: !isDesktop,
        drawerType: isDesktop ? 'permanent' : 'front',
        drawerStyle: { width: 320, backgroundColor: palette.background },
        sceneStyle: isDesktop ? { marginLeft: 0 } : undefined,
        drawerActiveTintColor: palette.tint,
      }}
      drawerContent={({ navigation }) => (
        <ResponsiveDrawerMenu
          isOpen
          onClose={() => navigation.closeDrawer()}
          title="APPNAME"
          persistent={isDesktop}
          renderMode="drawerContent"
          items={[
            { label: 'Home', href: '/', icon: 'home' },
            { label: 'Login', href: '/login', icon: 'login' },
            { label: 'Signup', href: '/signup', icon: 'person-add' },
          ]}
        />
      )}>
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="login"
        options={{
          title: 'Login',
          drawerIcon: ({ color }) => <MaterialIcons size={20} name="login" color={color} />,
        }}
      />
      <Drawer.Screen
        name="signup"
        options={{
          title: 'Signup',
          drawerIcon: ({ color }) => <MaterialCommunityIcons size={20} name="account-plus" color={color} />,
        }}
      />
      <Drawer.Screen
        name="forgot-password"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Forgot Password',
        }}
      />
      <Drawer.Screen
        name="verify-email"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Verify Email',
        }}
      />
    </Drawer>
  );
}
