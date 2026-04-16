import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type AvatarMenuButtonProps = {
  onProfile?: () => void;
  onSignOut?: () => void;
  onSettings?: () => void;
  style?: object;
};

export function AvatarMenuButton({ onProfile, onSignOut, onSettings, style }: AvatarMenuButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const [isOpen, setIsOpen] = useState(false);
  const menuBackgroundColor = theme.background;

  const close = () => setIsOpen(false);

  const handleAction = (action: 'profile' | 'settings' | 'signout') => {
    close();

    if (action === 'profile') {
      onProfile?.();
      return;
    }
    if (action === 'settings') {
      onSettings?.();
      return;
    }
    onSignOut?.();
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open profile menu"
        onPress={() => setIsOpen((prev) => !prev)}
        style={[styles.avatarButton, { borderColor: theme.icon }]}>
        <View
          style={[
            styles.avatarInner,
            {
              backgroundColor: isDark
                ? 'rgba(255, 255, 255, 0.14)'
                : 'rgba(37, 99, 235, 0.16)',
            },
          ]}
        />
      </Pressable>

      {isOpen ? (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: menuBackgroundColor,
              borderColor: theme.icon,
            },
          ]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            style={[styles.menuItem, { backgroundColor: menuBackgroundColor, borderBottomColor: theme.icon }]}
            onPress={() => handleAction('profile')}>
            <MaterialIcons name="person" size={16} color={theme.icon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Profile</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            style={[styles.menuItem, { backgroundColor: menuBackgroundColor, borderBottomColor: theme.icon }]}
            onPress={() => handleAction('settings')}>
            <MaterialIcons name="settings" size={16} color={theme.icon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Settings</Text>
          </Pressable>
          <Pressable
            testID="profile-menu-signout"
            accessibilityRole="button"
            accessibilityLabel="Sign out"
            style={[styles.menuItem, { backgroundColor: menuBackgroundColor }]}
            onPress={() => handleAction('signout')}>
            <MaterialIcons name="logout" size={16} color="#dc2626" />
            <Text style={[styles.menuText, styles.menuTextDanger]}>Sign out</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 40,
  },
  avatarButton: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  avatarInner: {
    borderRadius: 999,
    height: 18,
    width: 18,
  },
  menu: {
    overflow: 'hidden',
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 170,
    opacity: 1,
    paddingVertical: 6,
    position: 'absolute',
    right: 0,
    top: 36,
    zIndex: 50,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  menuItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 14,
  },
  menuTextDanger: {
    color: '#dc2626',
  },
});
