import React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';

import { Card } from '@/components/ui/card';

type ContentCardProps = {
  children: React.ReactNode;
  /** Applied on native only; on web use `className` to avoid DOM style errors. */
  style?: ViewStyle;
  /** Merged into Card on web (NativeWind). Ignored on native unless you also need className there. */
  className?: string;
};

const webShellClass = 'w-full rounded-[18px]';

export function ContentCard({ children, style, className }: ContentCardProps) {
  if (Platform.OS === 'web') {
    const mergedClass = className ? `${webShellClass} ${className}` : webShellClass;
    return (
      <Card size="md" variant="elevated" className={mergedClass}>
        {children}
      </Card>
    );
  }

  return (
    <Card size="md" variant="elevated" style={[styles.card, style]}>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    width: '100%',
  },
});
