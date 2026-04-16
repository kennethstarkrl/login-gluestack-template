import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

type PageContainerProps = {
  children: React.ReactNode;
  maxWidth?: number;
  centered?: boolean;
  keyboardAware?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
};

export function PageContainer({
  children,
  maxWidth = 860,
  centered = false,
  keyboardAware = false,
  keyboardShouldPersistTaps = 'handled',
}: PageContainerProps) {
  const content = (
    <ScrollView keyboardShouldPersistTaps={keyboardShouldPersistTaps} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.inner, { maxWidth }, centered && styles.centered]}>{children}</View>
    </ScrollView>
  );

  if (!keyboardAware) {
    return content;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  inner: {
    alignSelf: 'center',
    width: '100%',
  },
  centered: {
    justifyContent: 'center',
    minHeight: '100%',
  },
});
