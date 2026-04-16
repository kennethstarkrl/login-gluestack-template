import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AuthScreenShell } from '@/components/app-ui/auth-screen-shell';
import { FormActionStack } from '@/components/app-ui/form-action-stack';
import { OrDivider } from '@/components/app-ui/or-divider';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { AlertCircleIcon, CheckIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Link, LinkText } from '@/components/ui/link';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks/use-auth';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { login } = useAuth();
  const isTestEnvironment = process.env.EXPO_PUBLIC_APP_ENV === 'test';
  const [emailValue, setEmailValue] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = () => {
    const isEmailValid = emailValue.includes('@') && emailValue.length >= 3;
    const isPasswordValid = passwordValue.length >= 6;
    setIsEmailInvalid(!isEmailValid);
    setIsPasswordInvalid(!isPasswordValid);

    if (isEmailValid && isPasswordValid && emailValue === 'demo@na.com' && passwordValue === 'password') {
      login({ email: emailValue, password: passwordValue, token: 'demo-token-123' });
      router.replace('/explore');
    }
  };

  const handleTestLogin = () => {
    login({ email: 'test-user@app.local', token: 'test-token-123' });
    router.replace('/explore');
  };

  return (
    <AuthScreenShell title="Welcome back" subtitle="Sign in to continue managing your account and workspace.">
      <VStack space="md">
        <FormControl isInvalid={isEmailInvalid} size="md">
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

        <FormControl isInvalid={isPasswordInvalid} size="md">
          <FormControlLabel style={styles.passwordLabel}>
            <FormControlLabelText>Password</FormControlLabelText>
            <Link href="/forgot-password" style={styles.forgotPasswordLink}>
              <LinkText>Forgot password?</LinkText>
            </Link>
          </FormControlLabel>
          <Input size="md">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              value={passwordValue}
              onChangeText={(text) => {
                setPasswordValue(text);
                setIsPasswordInvalid(false);
              }}
            />
            <InputSlot className="pr-3" onPress={() => setShowPassword((prev) => !prev)}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>At least 6 characters are required.</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Checkbox value="remember" size="md" isChecked={rememberPassword} onChange={setRememberPassword}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Remember this device</CheckboxLabel>
        </Checkbox>
      </VStack>

      <FormActionStack>
        <Button size="sm" onPress={handleSubmit} style={styles.fullButton}>
          <MaterialIcons name="login" size={18} color={Colors.light.text} style={styles.buttonIcon} />
          <ButtonText>Sign in</ButtonText>
        </Button>
        {isTestEnvironment ? (
          <Button size="sm" variant="outline" style={styles.fullButton} onPress={handleTestLogin}>
            <ButtonText>Continue as test user</ButtonText>
          </Button>
        ) : null}
      </FormActionStack>

      <OrDivider />

      <VStack space="sm">
        <Button size="sm" variant="outline" style={styles.fullButton} onPress={() => console.log('Google login')}>
          <AntDesign name="google" size={18} color={palette.text} style={styles.buttonIcon} />
          <ButtonText>Continue with Google</ButtonText>
        </Button>
        <Button size="sm" variant="outline" style={styles.fullButton} onPress={() => console.log('Facebook login')}>
          <Entypo name="facebook" size={18} color={palette.text} style={styles.buttonIcon} />
          <ButtonText>Continue with Facebook</ButtonText>
        </Button>
        <Button size="sm" variant="outline" style={styles.fullButton} onPress={() => console.log('X login')}>
          <FontAwesome6 name="x-twitter" size={16} color={palette.text} style={styles.buttonIcon} />
          <ButtonText>Continue with X</ButtonText>
        </Button>
      </VStack>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  passwordLabel: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  forgotPasswordLink: {
    marginLeft: 'auto',
  },
  fullButton: {
    width: '100%',
  },
  buttonIcon: {
    marginRight: 6,
  },
});
