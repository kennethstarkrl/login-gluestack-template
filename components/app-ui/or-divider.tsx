import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Divider } from '@/components/ui/divider';
import { Text } from '@/components/ui/text';

export function OrDivider() {
  return (
    <View style={styles.row}>
      <Divider style={styles.line} />
      <Text size="sm" style={styles.label}>
        OR CONTINUE WITH
      </Text>
      <Divider style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 2,
  },
  line: {
    flex: 1,
  },
  label: {
    letterSpacing: 0.6,
    marginHorizontal: 10,
    opacity: 0.8,
  },
});
