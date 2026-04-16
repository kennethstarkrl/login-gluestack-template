import { usePathname, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AvatarMenuButton } from '@/components/navigation/avatar-menu-button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type DrawerMenuItem = {
  label: string;
  href?: string;
  onPress?: () => void;
  destructive?: boolean;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
};

type DrawerFooterButton = {
  label: string;
  href?: string;
  onPress?: () => void;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
};

type ResponsiveDrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: DrawerMenuItem[];
  persistent?: boolean;
  renderMode?: 'overlay' | 'drawerContent';
  footerButtons?: DrawerFooterButton[];
  showAvatarPlaceholder?: boolean;
  onAvatarProfile?: () => void;
  onAvatarSettings?: () => void;
  onAvatarSignOut?: () => void;
};

export function ResponsiveDrawerMenu({
  isOpen,
  onClose,
  title,
  items,
  persistent = false,
  renderMode = 'overlay',
  footerButtons = [],
  showAvatarPlaceholder = false,
  onAvatarProfile,
  onAvatarSettings,
  onAvatarSignOut,
}: ResponsiveDrawerMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const activeBackground = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(37, 99, 235, 0.14)';
  const hoverBackground = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(100, 116, 139, 0.1)';
  const borderSubtle = isDark ? '#2a2a2a' : '#e2e8f0';

  const handleItemPress = (item: DrawerMenuItem) => {
    onClose();

    if (item.onPress) {
      item.onPress();
      return;
    }

    if (item.href) {
      router.push(item.href as never);
    }
  };

  const handleFooterButtonPress = (button: DrawerFooterButton) => {
    onClose();

    if (button.onPress) {
      button.onPress();
      return;
    }

    if (button.href) {
      router.push(button.href as never);
    }
  };

  if (!isOpen && !persistent && renderMode === 'overlay') {
    return null;
  }

  const shouldUseOverlay = renderMode === 'overlay';

  return (
    <View
      style={
        shouldUseOverlay
          ? [styles.overlay, persistent && styles.overlayPersistent]
          : styles.containerInDrawer
      }>
      {shouldUseOverlay && !persistent ? (
        <Pressable style={styles.backdrop} onPress={onClose} />
      ) : null}
      <View
        testID="responsive-drawer-menu-panel"
        style={[
          styles.panelBase,
          shouldUseOverlay ? styles.panelOverlay : styles.panelInDrawer,
          (persistent || !shouldUseOverlay) && styles.panelPersistent,
          {
            backgroundColor: theme.background,
            borderRightColor: borderSubtle,
          },
        ]}>
        <View style={[styles.header, { borderBottomColor: borderSubtle }]}>
          <View style={styles.brand}>
            <View
              style={[
                styles.brandIcon,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(37, 99, 235, 0.14)',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(37, 99, 235, 0.26)',
                },
              ]}>
              <MaterialIcons
                name="apps"
                size={16}
                color={theme.tint}
              />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>
              {title}
            </Text>
          </View>
          {showAvatarPlaceholder ? (
            <AvatarMenuButton
              onProfile={onAvatarProfile}
              onSettings={onAvatarSettings}
              onSignOut={onAvatarSignOut}
            />
          ) : null}
          {!persistent && shouldUseOverlay ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close navigation menu"
              onPress={onClose}
              style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={theme.text} />
            </Pressable>
          ) : null}
        </View>
        <View style={styles.menuArea}>
          <View style={styles.menuList}>
            {items.map((item) => {
              const isActive = Boolean(item.href && pathname === item.href);

              return (
                <Pressable
                  key={`${item.label}-${item.href ?? 'action'}`}
                  onPress={() => handleItemPress(item)}
                  style={({ hovered, pressed }) => [
                    styles.menuItem,
                    {
                      backgroundColor: isActive
                        ? activeBackground
                        : hovered || pressed
                          ? hoverBackground
                          : 'transparent',
                      borderColor: isActive
                        ? isDark
                          ? 'rgba(255, 255, 255, 0.22)'
                          : 'rgba(37, 99, 235, 0.35)'
                        : 'transparent',
                    },
                  ]}>
                  {item.icon ? (
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={isActive ? theme.tint : theme.icon}
                      style={styles.menuIcon}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.menuText,
                      isActive && styles.menuTextActive,
                      item.destructive && styles.menuTextDestructive,
                      { color: isActive ? theme.tint : theme.text },
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {footerButtons.length ? (
            <View style={[styles.footerRow, { borderTopColor: borderSubtle }]}>
              {footerButtons.map((button) => (
                <Pressable
                  key={`footer-${button.label}`}
                  onPress={() => handleFooterButtonPress(button)}
                  style={({ hovered, pressed }) => [
                    styles.footerButton,
                    {
                      backgroundColor:
                        hovered || pressed
                          ? hoverBackground
                          : 'transparent',
                      borderColor: isDark ? '#3f3f3f' : '#cbd5e1',
                    },
                  ]}>
                  {button.icon ? (
                    <MaterialIcons
                      name={button.icon}
                      size={16}
                      color={theme.icon}
                      style={styles.footerButtonIcon}
                    />
                  ) : null}
                  <Text style={[styles.footerButtonText, { color: theme.text }]}>
                    {button.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInDrawer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlayPersistent: {
    width: 320,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  panelBase: {
    borderRightWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 18,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
    elevation: 10,
  },
  panelOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  panelPersistent: {
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    width: 320,
  },
  panelInDrawer: {
    flex: 1,
    width: '100%',
    borderRightWidth: 0,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 20,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    minWidth: 0,
  },
  brandIcon: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  closeButton: {
    padding: 4,
  },
  menuList: {
    gap: 10,
  },
  menuArea: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  menuItem: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  menuIcon: {
    marginTop: 1,
  },
  menuText: {
    fontSize: 15,
  },
  menuTextActive: {
    fontWeight: '700',
  },
  menuTextDestructive: {
    color: '#ef4444',
  },
  footerRow: {
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingTop: 12,
  },
  footerButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    gap: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  footerButtonIcon: {
    marginTop: 1,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
