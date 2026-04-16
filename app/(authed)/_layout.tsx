import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

import { AvatarMenuButton } from '@/components/navigation/avatar-menu-button';
import { ResponsiveDrawerMenu } from '@/components/navigation/responsive-drawer-menu';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { useAuth } from '@/hooks/use-auth';

import { useRouter } from 'expo-router';

export default function AuthedLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const { logout } = useAuth();
  const isDesktop = Platform.OS === 'web' && width >= 1024;
  const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleLogout = () => {
    logout();
    router.replace('/');
  };
  const handleOpenSettings = () => {
    router.push('/(authed)/settings');
  };
  const handleOpenProfile = () => {
    router.push('/(authed)/profile');
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: !isDesktop,
        drawerType: isDesktop ? 'permanent' : 'front',
        drawerStyle: { width: 320, backgroundColor: palette.background },
        sceneStyle: isDesktop ? { marginLeft: 0 } : undefined,
        drawerActiveTintColor: palette.tint,
        headerRight: () =>
          !isDesktop ? (
            <AvatarMenuButton
              onProfile={handleOpenProfile}
              onSignOut={handleLogout}
              onSettings={handleOpenSettings}
              style={styles.headerAvatar}
            />
          ) : null,
      }}
      drawerContent={({ navigation }) => (
        <ResponsiveDrawerMenu
          isOpen
          onClose={() => navigation.closeDrawer()}
          title="APPNAME"
          persistent={isDesktop}
          renderMode="drawerContent"
          showAvatarPlaceholder
          onAvatarProfile={handleOpenProfile}
          onAvatarSettings={handleOpenSettings}
          onAvatarSignOut={handleLogout}
          items={[
            { label: 'Explore', href: '/(authed)/explore', icon: 'explore' },
          ]}
        />
      )}>
      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explore',
          drawerIcon: ({ color }) => <IconSymbol size={20} name="paperplane.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Settings',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Profile',
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
    headerAvatar: {
      marginRight: 12,
    },
});
