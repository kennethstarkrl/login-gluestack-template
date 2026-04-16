import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type PostCardProps = {
  authorName: string;
  authorHandle: string;
  content: string;
  timeAgo: string;
  avatarFallback: string;
  isVerified?: boolean;
  replies?: number;
  reposts?: number;
  likes?: number;
  views?: string;
  showTopBorder?: boolean;
};

export function PostCard({
  authorName,
  authorHandle,
  content,
  timeAgo,
  avatarFallback,
  isVerified = false,
  replies = 0,
  reposts = 0,
  likes = 0,
  views = '',
  showTopBorder = false,
}: PostCardProps) {
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const mutedText = colorScheme === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <Card
      size="sm"
      variant="ghost"
      style={{
        ...StyleSheet.flatten(styles.card),
        borderColor: mutedText,
        borderTopWidth: showTopBorder ? 1 : 0,
      }}>
      <View style={styles.postRow}>
        <Avatar size="sm" style={styles.avatar}>
          <AvatarFallbackText>{avatarFallback}</AvatarFallbackText>
        </Avatar>

        <View style={styles.contentColumn}>
          <View style={styles.headerRow}>
            <View style={styles.authorRow}>
              <Text style={{ ...styles.authorName, color: palette.text }}>{authorName}</Text>
              {isVerified ? <MaterialIcons name="verified" size={16} color="#3b82f6" /> : null}
              <Text style={{ ...styles.metaText, color: mutedText }}>@{authorHandle}</Text>
              <Text style={{ ...styles.metaText, color: mutedText }}>· {timeAgo}</Text>
            </View>
            <Feather name="more-horizontal" size={16} color={mutedText} />
          </View>

          <View style={styles.textWrap}>
            <Text size="sm" style={{ ...styles.postText, color: palette.text }}>
              {content}
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.actionItem}>
              <Feather name="message-circle" size={15} color={mutedText} />
              <Text size="sm" style={{ ...styles.metaText, color: mutedText }}>
                {replies}
              </Text>
            </View>
            <View style={styles.actionItem}>
              <Feather name="repeat" size={15} color={mutedText} />
              <Text size="sm" style={{ ...styles.metaText, color: mutedText }}>
                {reposts}
              </Text>
            </View>
            <View style={styles.actionItem}>
              <Feather name="heart" size={15} color={mutedText} />
              <Text size="sm" style={{ ...styles.metaText, color: mutedText }}>
                {likes}
              </Text>
            </View>
            <View style={styles.actionItem}>
              <Feather name="bar-chart-2" size={15} color={mutedText} />
              <Text size="sm" style={{ ...styles.metaText, color: mutedText }}>
                {views}
              </Text>
            </View>
            <Feather name="share" size={15} color={mutedText} />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
    width: '100%',
  },
  avatar: {
    marginTop: 2,
  },
  contentColumn: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    alignSelf: 'flex-start',
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    width: '100%',
  },
  authorRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  metaText: {
    fontSize: 13,
  },
  textWrap: {
    width: '100%',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  postText: {
    margin: 0,
    width: '100%',
    lineHeight: 17,
    paddingVertical: 0,
    marginBottom: 3,
  },
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    width: '100%',
  },
  actionItem: {
    alignItems: 'center',
    columnGap: 4,
    flexDirection: 'row',
  },
});
