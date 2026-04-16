import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AuthScreenShell } from '@/components/app-ui/auth-screen-shell';
import { FormActionStack } from '@/components/app-ui/form-action-stack';
import { OrDivider } from '@/components/app-ui/or-divider';
import { Button, ButtonText } from '@/components/ui/button';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
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
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SignupScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const palette = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [usernameValue, setUsernameValue] = useState('');
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);

    const [emailValue, setEmailValue] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [termsAgreed,setTermsAgreed] = useState(false);
    const [termsAgreedInvalid,setTermsAgreedInvalid] = useState(false);

    const handleSubmit = () => {
        const isUsernameValid = usernameValue.length >= 3;
        const isEmailValid = emailValue.length >= 3;
        const isPasswordValid = passwordValue.length >= 6;
        const isConfirmPasswordValid = passwordValue === confirmPasswordValue && confirmPasswordValue.length >= 6;
        const hasAcceptedTerms = termsAgreed;

        if(usernameValue.length < 3) {
            setIsUsernameInvalid(true);
        } else {
            setIsUsernameInvalid(false);
        }

        if(emailValue.length < 3) {
            setIsEmailInvalid(true);
        } else {
            setIsEmailInvalid(false);
        }

        if (passwordValue.length < 6) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }

        if(passwordValue !== confirmPasswordValue || confirmPasswordValue.length < 6) {
            setIsConfirmPasswordInvalid(true);
        } else {
            setIsConfirmPasswordInvalid(false);
        }

        if(!termsAgreed) {
            setTermsAgreedInvalid(true);
        } else {
            setTermsAgreedInvalid(false);
        }

        if (
            isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            hasAcceptedTerms
        ) {
            router.push({
                pathname: '/verify-email',
                params: { email: emailValue },
            });
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

  return (
    <AuthScreenShell
      title="Create your account"
      subtitle="Get started with a polished, secure experience in less than a minute.">
      <VStack space="md">
            <FormControl
                    isInvalid={isUsernameInvalid}
                    size="md"
                >
                    <FormControlLabel>
                        <FormControlLabelText>Username</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                        <InputField
                            type='text'
                            placeholder="username"
                            value={usernameValue}
                            onChangeText={(text) => {setUsernameValue(text);setIsUsernameInvalid(false)}}
                        />
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        Username is invalid.
                    </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl
                    isInvalid={isEmailInvalid}
                    size="md"
                >
                    <FormControlLabel>
                    <FormControlLabelText>Email Address</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                    <InputField
                        type='text'
                        placeholder="na@example.com"
                        value={emailValue}
                        onChangeText={(text) => {setEmailValue(text);setIsEmailInvalid(false)}}
                    />
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        Email Address is invalid.
                    </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl
                    isInvalid={isPasswordInvalid}
                    size="md"
                >
                    <FormControlLabel style={{justifyContent:'space-between'}}>
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            value={passwordValue}
                            onChangeText={(text) => {setPasswordValue(text);setIsPasswordInvalid(false)}}
                        />
                        <InputSlot className="pr-3" onPress={handleShowPassword}>
                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                        </InputSlot>
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        At least 6 characters are required.
                    </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl
                    isInvalid={isConfirmPasswordInvalid}
                    size="md"
                >
                    <FormControlLabel style={{justifyContent:'space-between'}}>
                        <FormControlLabelText>Confirm Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                        <InputField
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="confirm password"
                            value={confirmPasswordValue}
                            onChangeText={(text) => {setConfirmPasswordValue(text);setIsConfirmPasswordInvalid(false)}}
                        />
                        <InputSlot className="pr-3" onPress={handleShowConfirmPassword}>
                            <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                        </InputSlot>
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        Passwords do not match.
                    </FormControlErrorText>
                    </FormControlError>
                    <View style={styles.termsRow}>
                        <Checkbox value={'terms'} isInvalid={false} size="md" isChecked={termsAgreed} onChange={(e)=>{setTermsAgreed(e);setTermsAgreedInvalid(false)}}>
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>I agree to the terms and policy</CheckboxLabel>
                        </Checkbox>
                    </View>
                    <Text size="sm" className="text-text-subtle">
                      By creating an account, you agree to our{' '}
                      <Link href="/"><LinkText>Terms of Service</LinkText></Link> and{' '}
                      <Link href="/"><LinkText>Privacy Policy</LinkText></Link>.
                    </Text>
                    {termsAgreedInvalid ? 
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            You must agree to the terms of service and privacy policy.
                        </FormControlErrorText>
                    </FormControlError>
                    : null}
                </FormControl>
            </VStack>
            <FormActionStack>
                <Button style={styles.loginButtons} size="sm" onPress={handleSubmit}>
                    <ButtonText>Create account</ButtonText>
                </Button>
            </FormActionStack>
            <OrDivider />
            <VStack space="sm">
                    <Button
                        style={styles.loginButtons}
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with Google')}
                    >
                        <AntDesign name="google" size={18} color={palette.text} style={styles.socialIcon} />
                        <ButtonText>Continue with Google</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with Facebook')}
                    >
                        <Entypo name="facebook" size={18} color={palette.text} style={styles.socialIcon} />
                        <ButtonText>Continue with Facebook</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with X')}
                    >
                        <FontAwesome6 name="x-twitter" size={16} color={palette.text} style={styles.socialIcon} />
                        <ButtonText>Continue with X</ButtonText>
                    </Button>
            </VStack>
    </AuthScreenShell>
  );
}

const styles = StyleSheet.create({
  loginButtons:{
    minWidth:'100%'
  },
  termsRow: {
    marginTop: 6,
  },
  socialIcon: {
    marginRight: 6,
  },
});
