import React from 'react';
import { StyleSheet, View } from 'react-native';

type FormActionStackProps = {
  children: React.ReactNode;
};

export function FormActionStack({ children }: FormActionStackProps) {
  return <View style={styles.stack}>{children}</View>;
}

const styles = StyleSheet.create({
  stack: {
    gap: 10,
  },
});
