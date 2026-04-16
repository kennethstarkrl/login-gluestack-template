import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function ModalScreen() {
  return (
    <PageContainer maxWidth={520} centered>
      <ContentCard>
        <VStack space="md">
          <Text size="sm" className="text-text-subtle">
            MODAL
          </Text>
          <Heading size="lg">This is a modal</Heading>
          <Text size="sm">It now uses the same design system and component language as the rest of the app.</Text>
          <View style={styles.link}>
            <Link href="/" dismissTo asChild>
              <Button size="sm">
                <ButtonText>Go to home screen</ButtonText>
              </Button>
            </Link>
          </View>
        </VStack>
      </ContentCard>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  link: {
    width: '100%',
  },
});
