import { Link } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function LandingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const heroBodyStyle = isDesktop ? styles.heroBodyDesktop : styles.heroBody;
  const leftColumnStyle = isDesktop ? styles.leftColumnDesktop : styles.leftColumn;
  const visualPanelStyle = [styles.visualPanel, isDesktop && styles.visualPanelDesktop];

  return (
    <PageContainer maxWidth={940} keyboardAware>
        <View style={styles.heroWrapper}>
          <ContentCard>
            <View style={heroBodyStyle}>
              <VStack space="lg" style={leftColumnStyle}>
                <VStack space="sm">
                  <Text style={styles.badgeText}>CLEAN SAAS STARTER</Text>
                  <Heading size="2xl">Build trust with polished authentication flows.</Heading>
                  <Text size="md">
                    This template gives you a professional login experience, responsive navigation, and
                    consistent account screens out of the box.
                  </Text>
                </VStack>

                <VStack space="sm">
                  <Text size="sm">
                    Designed for teams that want speed without sacrificing visual quality and UX
                    clarity.
                  </Text>
                  <Text size="sm">
                    Keep the architecture and evolve the brand with reusable app-level UI primitives.
                  </Text>
                </VStack>

                <VStack space="sm">
                  <Link href="/login" asChild>
                    <Button size="sm" variant="solid" style={styles.actionButton}>
                      <ButtonText>Get Started</ButtonText>
                    </Button>
                  </Link>
                  <Link href="/signup" asChild>
                    <Button size="sm" variant="outline" style={styles.actionButton}>
                      <ButtonText>Create Account</ButtonText>
                    </Button>
                  </Link>
                </VStack>
              </VStack>

              <View style={visualPanelStyle}>
                <View style={styles.visualContent}>
                  <View style={styles.visualBadge}>
                    <Text style={styles.visualBadgeText}>PRODUCT PREVIEW</Text>
                  </View>
                  <Text style={styles.visualTitle}>What you get</Text>
                  <Text size="sm" style={styles.visualCopy}>
                    Accessible forms, responsive drawers, and cohesive spacing and typography across
                    every route.
                  </Text>
                  <View style={styles.mockRow}>
                    <View style={[styles.mockBlock, styles.mockBlockLg]} />
                    <View style={[styles.mockBlock, styles.mockBlockSm]} />
                  </View>
                  <View style={[styles.mockBlock, styles.mockBlockFull]} />
                </View>
              </View>
            </View>
          </ContentCard>
        </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    alignSelf: 'center',
    maxWidth: 940,
    width: '100%',
  },
  heroBody: {
    gap: 20,
  },
  heroBodyDesktop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 24,
  },
  leftColumn: {
    width: '100%',
  },
  leftColumnDesktop: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  visualPanel: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    flexGrow: 0,
    flexShrink: 0,
    height: 'auto',
    padding: 18,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
  visualPanelDesktop: {
    width: 320,
  },
  visualContent: {
    alignSelf: 'flex-start',
    flexGrow: 0,
    flexShrink: 0,
    height: 'auto',
    width: '100%',
  },
  visualBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(37, 99, 235, 0.16)',
  },
  visualBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  visualTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  visualCopy: {
    lineHeight: 22,
    marginTop: 8,
    maxWidth: '100%',
    opacity: 0.9,
  },
  mockRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  mockBlock: {
    borderRadius: 10,
    backgroundColor: 'rgba(37, 99, 235, 0.22)',
  },
  mockBlockLg: {
    height: 44,
    flex: 1,
  },
  mockBlockSm: {
    height: 44,
    width: 72,
  },
  mockBlockFull: {
    height: 84,
    marginTop: 10,
    width: '100%',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  actionButton: {
    width: '100%',
  },
});
