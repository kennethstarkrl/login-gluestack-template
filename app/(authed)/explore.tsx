import { StyleSheet, View } from 'react-native';

import { AuthError } from '@/components/errors/auth-error';
import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';

export default function TabTwoScreen() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthError />;
  }

  return (
    <PageContainer maxWidth={920}>
      <View style={styles.pageWrapper}>
        <ContentCard>
          <VStack space="lg">
            <VStack space="xs">
              <Text style={styles.badgeText}>DASHBOARD</Text>
              <Heading size="xl">Workspace overview</Heading>
              <Text size="sm">
                Welcome back{user?.email ? `, ${user.email}` : ''}. Here is a clean snapshot of your
                account and product activity.
              </Text>
            </VStack>

            <VStack space="md">
              <Card size="sm" variant="outline" style={styles.sectionCard}>
                <VStack space="xs">
                  <Heading size="md">Quick Summary</Heading>
                  <Text size="sm">
                    Conversion is up 12% this week and completion time for signup is trending down.
                  </Text>
                </VStack>
              </Card>

              <Card size="sm" variant="outline" style={styles.sectionCard}>
                <VStack space="xs">
                  <Heading size="md">Recent Activity</Heading>
                  <Text size="sm">
                    Three design updates shipped in the last 24 hours with no auth regressions.
                  </Text>
                </VStack>
              </Card>

              <Card size="sm" variant="outline" style={styles.sectionCard}>
                <VStack space="xs">
                  <Heading size="md">Next Steps</Heading>
                  <Text size="sm">
                    Connect analytics events to onboarding milestones and finalize profile persistence.
                  </Text>
                </VStack>
              </Card>
            </VStack>

            <HStack space="sm" style={styles.actionsRow}>
              <Button size="sm" variant="solid" style={styles.actionButton}>
                <ButtonText>Primary Action</ButtonText>
              </Button>
              <Button size="sm" variant="outline" style={styles.actionButton}>
                <ButtonText>Secondary Action</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ContentCard>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  pageWrapper: {
    alignSelf: 'center',
    maxWidth: 860,
    width: '100%',
  },
  card: {
    width: '100%',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  sectionCard: {
    width: '100%',
  },
  actionsRow: {
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
  },
});
