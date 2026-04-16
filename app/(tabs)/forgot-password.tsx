import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AuthScreenShell } from '@/components/app-ui/auth-screen-shell';
import { FormActionStack } from '@/components/app-ui/form-action-stack';
import { InlineNotice } from '@/components/app-ui/inline-notice';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (emailValue.trim().length < 3 || !emailValue.includes('@')) {
      setIsEmailInvalid(true);
      return;
    }

    setIsEmailInvalid(false);
    setIsSubmitted(true);
    console.log(`Send password reset email to ${emailValue}`);
  };

  return (
    <AuthScreenShell
      title="Reset your password"
      subtitle="We will send a secure password reset link to your account email.">
      <VStack space="md">
        <FormControl isInvalid={isEmailInvalid} size="md" isRequired>
          <FormControlLabel>
            <FormControlLabelText>Email Address</FormControlLabelText>
          </FormControlLabel>
          <Input size="md">
            <InputField
              type="text"
              placeholder="name@company.com"
              value={emailValue}
              onChangeText={(text) => {
                setEmailValue(text);
                setIsEmailInvalid(false);
              }}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>Please enter a valid email address.</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {isSubmitted ? (
          <InlineNotice tone="success">
            If an account exists for {emailValue}, a reset link has been sent.
          </InlineNotice>
        ) : null}
      </VStack>

      <FormActionStack>
        <Button size="sm" variant="solid" style={styles.actionButton} onPress={handleSubmit}>
          <ButtonText>Send reset link</ButtonText>
        </Button>
        <Button size="sm" variant="outline" style={styles.actionButton} onPress={() => router.replace('/login')}>
          <ButtonText>Back to login</ButtonText>
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
