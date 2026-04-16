import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';

type InlineNoticeProps = {
  children: React.ReactNode;
  tone?: 'success' | 'neutral';
};

export function InlineNotice({ children, tone = 'neutral' }: InlineNoticeProps) {
  return (
    <View style={[styles.base, tone === 'success' ? styles.success : styles.neutral]}>
      <Text size="sm">{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  neutral: {
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
  },
  success: {
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
  },
});
