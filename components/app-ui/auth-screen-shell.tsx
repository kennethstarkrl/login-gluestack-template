import React from 'react';

import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

type AuthScreenShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthScreenShell({ title, subtitle, children }: AuthScreenShellProps) {
  return (
    <PageContainer maxWidth={500} centered keyboardAware>
      <ContentCard>
        <VStack space="lg">
          <VStack space="xs">
            <Text size="sm" className="text-text-subtle">
              SECURE ACCESS
            </Text>
            <Heading size="lg">{title}</Heading>
            <Text size="sm" className="text-text-muted">
              {subtitle}
            </Text>
          </VStack>
          {children}
        </VStack>
      </ContentCard>
    </PageContainer>
  );
}
