import { Button, ButtonText } from '@/components/ui/button';
import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useRouter } from 'expo-router';

export function AuthError() {
  const router = useRouter();
  return (
    <PageContainer maxWidth={520} centered>
      <ContentCard>
        <VStack space="md">
          <Text size="sm" className="text-text-subtle">
            AUTH REQUIRED
          </Text>
          <Heading size="lg">You need to sign in</Heading>
          <Text size="sm">Please log in to continue to this protected area.</Text>
          <HStack space="sm">
            {router.canGoBack() ? (
              <Button size="sm" variant="outline" onPress={() => router.back()}>
                <ButtonText>Go back</ButtonText>
              </Button>
            ) : null}
            <Button size="sm" variant="solid" onPress={() => router.replace('/login')}>
              <ButtonText>Login</ButtonText>
            </Button>
            <Button size="sm" variant="outline" onPress={() => router.replace('/signup')}>
              <ButtonText>Signup</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ContentCard>
    </PageContainer>
  );
}