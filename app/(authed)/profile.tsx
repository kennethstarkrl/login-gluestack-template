import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { AuthError } from '@/components/errors/auth-error';
import { ContentCard } from '@/components/app-ui/content-card';
import { PageContainer } from '@/components/app-ui/page-container';
import { PostCard } from '@/components/app-ui/post-card';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';

const samplePosts = [
  {
    id: '1',
    message: 'Shipped a smoother signup flow today. Next up: profile customization controls.',
    timeAgo: '2h',
    replies: 12,
    reposts: 4,
    likes: 88,
    views: '4.2K',
  },
  {
    id: '2',
    message: 'Iterating on mobile-first card spacing. Tiny details, big feel improvements.',
    timeAgo: '1d',
    replies: 6,
    reposts: 2,
    likes: 41,
    views: '2.1K',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthError />;
  }

  const displayName = user?.email?.split('@')[0] ?? 'new-user';
  const username = `@${displayName.toLowerCase()}`;

  return (
    <PageContainer maxWidth={920}>
      <View style={styles.pageWrapper}>
        <ContentCard>
          <VStack space="lg">
            <View style={styles.headerImagePlaceholder}>
              <Text style={styles.placeholderText}>Professional profile header</Text>
            </View>

            <HStack style={styles.profileTopRow}>
              <Avatar size="xl" style={styles.avatar}>
                <AvatarFallbackText>{displayName}</AvatarFallbackText>
              </Avatar>
              <Button size="sm" variant="outline" onPress={() => router.push('/(authed)/settings')}>
                <ButtonText>Edit profile</ButtonText>
              </Button>
            </HStack>

            <VStack space="xs">
              <HStack style={styles.verifiedNameRow}>
                <Heading size="xl">{displayName}</Heading>
                <MaterialIcons name="verified" size={20} color="#7dd3fc" style={styles.verifiedIcon} />
              </HStack>
              <Text size="sm">{username}</Text>
              <Text size="sm" style={styles.bioText}>
                Building clean auth flows and polished interfaces. Sharing weekly product updates.
              </Text>
              <HStack space="md" style={styles.statsRow}>
                <Text size="sm">
                  <Text style={styles.statValue}>218</Text> Following
                </Text>
                <Text size="sm">
                  <Text style={styles.statValue}>1,084</Text> Followers
                </Text>
              </HStack>
            </VStack>

            <VStack space="sm">
              <Heading size="md">Posts</Heading>
              {samplePosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  authorName={displayName}
                  authorHandle={displayName.toLowerCase()}
                  avatarFallback={displayName}
                  content={post.message}
                  timeAgo={post.timeAgo}
                  isVerified
                  replies={post.replies}
                  reposts={post.reposts}
                  likes={post.likes}
                  views={post.views}
                  showTopBorder={index === 0}
                />
              ))}
            </VStack>
          </VStack>
        </ContentCard>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    alignSelf: 'center',
    maxWidth: 860,
    width: '100%',
  },
  headerImagePlaceholder: {
    alignItems: 'center',
    backgroundColor: '#D1E2FF',
    borderRadius: 12,
    height: 170,
    justifyContent: 'center',
    width: '100%',
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  profileTopRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -40,
    paddingHorizontal: 8,
    zIndex: 2,
  },
  avatar: {
    borderWidth: 4,
    height: 96,
    width: 96,
  },
  bioText: {
    marginTop: 6,
  },
  verifiedNameRow: {
    alignItems: 'center',
    gap: 6,
  },
  verifiedIcon: {
    marginTop: 2,
  },
  statsRow: {
    marginTop: 8,
  },
  statValue: {
    fontWeight: '700',
  },
});
