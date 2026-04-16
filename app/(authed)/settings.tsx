import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthError } from '@/components/errors/auth-error';
import { ContentCard } from '@/components/app-ui/content-card';
import { InlineNotice } from '@/components/app-ui/inline-notice';
import { PageContainer } from '@/components/app-ui/page-container';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';

export default function SettingsScreen() {
  const { user, isAuthenticated } = useAuth();

  const initialName = useMemo(() => user?.email?.split('@')[0] ?? '', [user?.email]);
  const initialUsername = useMemo(
    () => (user?.email ? user.email.split('@')[0].toLowerCase() : ''),
    [user?.email]
  );

  const [nameValue, setNameValue] = useState(initialName);
  const [usernameValue, setUsernameValue] = useState(initialUsername);
  const [bioValue, setBioValue] = useState(
    'Building clean auth flows and polished interfaces. Sharing product updates and UI notes.'
  );
  const [locationValue, setLocationValue] = useState('');
  const [websiteValue, setWebsiteValue] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  if (!isAuthenticated) {
    return <AuthError />;
  }

  const handleSaveProfile = () => {
    // Local-only form for now; replace with API call when backend is ready.
    setSavedMessage('Profile changes saved.');
  };

  return (
    <PageContainer maxWidth={920}>
      <View style={styles.pageWrapper}>
        <ContentCard>
          <VStack space="lg">
            <VStack space="xs">
              <Text style={styles.badgeText}>ACCOUNT</Text>
              <Heading size="xl">Edit profile</Heading>
              <Text size="sm">Manage the details shown on your profile and account surfaces.</Text>
            </VStack>

            <VStack space="md">
              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input size="md">
                  <InputField
                    type="text"
                    placeholder="Your name"
                    value={nameValue}
                    onChangeText={(text) => {
                      setNameValue(text);
                      setSavedMessage('');
                    }}
                  />
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Input size="md">
                  <InputField
                    type="text"
                    placeholder="username"
                    value={usernameValue}
                    onChangeText={(text) => {
                      setUsernameValue(text.replace(/\s+/g, ''));
                      setSavedMessage('');
                    }}
                  />
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Bio</FormControlLabelText>
                </FormControlLabel>
                <Textarea size="md" style={styles.bioField}>
                  <TextareaInput
                    placeholder="Tell people about yourself"
                    value={bioValue}
                    onChangeText={(text) => {
                      setBioValue(text);
                      setSavedMessage('');
                    }}
                  />
                </Textarea>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Location</FormControlLabelText>
                </FormControlLabel>
                <Input size="md">
                  <InputField
                    type="text"
                    placeholder="City, Country"
                    value={locationValue}
                    onChangeText={(text) => {
                      setLocationValue(text);
                      setSavedMessage('');
                    }}
                  />
                </Input>
              </FormControl>

              <FormControl size="md">
                <FormControlLabel>
                  <FormControlLabelText>Website</FormControlLabelText>
                </FormControlLabel>
                <Input size="md">
                  <InputField
                    type="text"
                    placeholder="https://your-site.com"
                    value={websiteValue}
                    onChangeText={(text) => {
                      setWebsiteValue(text);
                      setSavedMessage('');
                    }}
                  />
                </Input>
              </FormControl>
            </VStack>

            <VStack space="xs">
              <Button size="sm" onPress={handleSaveProfile}>
                <ButtonText>Save profile changes</ButtonText>
              </Button>
              {savedMessage ? (
                <InlineNotice tone="success">{savedMessage}</InlineNotice>
              ) : null}
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
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  bioField: {
    minHeight: 130,
  },
  sectionCard: {
    width: '100%',
  },
});
