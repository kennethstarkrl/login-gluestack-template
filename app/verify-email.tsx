import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const email = typeof params.email === 'string' ? params.email : 'your email address';

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View>
        <Card size="md" variant="elevated" className="m-3">
          <VStack space="md">
            <Heading size="md">Verify your email</Heading>
            <Text size="sm">
              We sent a verification email to {email}. Please check your inbox and follow the link
              to activate your account.
            </Text>
            <Text size="sm">
              If you do not see it in a few minutes, check your spam folder or resend the email.
            </Text>
            <Button
              className="mt-2"
              size="sm"
              variant="solid"
              onPress={() => console.log(`Resend verification email to ${email}`)}>
              <ButtonText>Resend verification email</ButtonText>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => router.replace('/login')}>
              <ButtonText>Go to login</ButtonText>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => router.back()}>
              <ButtonText>Back to signup</ButtonText>
            </Button>
          </VStack>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
