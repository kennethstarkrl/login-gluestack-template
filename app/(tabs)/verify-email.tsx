import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AuthScreenShell } from '@/components/app-ui/auth-screen-shell';
import { FormActionStack } from '@/components/app-ui/form-action-stack';
import { InlineNotice } from '@/components/app-ui/inline-notice';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const email = typeof params.email === 'string' ? params.email : 'your email address';

  return (
    <AuthScreenShell
      title="Verify your email"
      subtitle="Confirm your inbox to activate your account and continue.">
      <VStack space="md">
        <InlineNotice>
          We sent a verification email to <Text className="font-semibold">{email}</Text>. If you do not
          see it in a few minutes, check your spam folder.
        </InlineNotice>
      </VStack>
      <FormActionStack>
        <Button
          size="sm"
          variant="solid"
          style={styles.actionButton}
          onPress={() => console.log(`Resend verification email to ${email}`)}>
          <ButtonText>Resend verification email</ButtonText>
        </Button>
        <Button size="sm" variant="outline" style={styles.actionButton} onPress={() => router.replace('/login')}>
          <ButtonText>Go to login</ButtonText>
        </Button>
        <Button size="sm" variant="outline" style={styles.actionButton} onPress={() => router.back()}>
          <ButtonText>Back to signup</ButtonText>
        </Button>
      </FormActionStack>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: '100%',
  },
});
