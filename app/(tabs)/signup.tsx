import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

                
    import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';


import { Button, ButtonText } from '@/components/ui/button';
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText
} from '@/components/ui/form-control';
import { HStack } from '@/components/ui/hstack';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';

import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';

import { Divider } from '@/components/ui/divider';

import { Link, LinkText } from '@/components/ui/link';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
  
  
export default function SignupScreen() {
    const colorScheme = useColorScheme();

    const [usernameValue, setUsernameValue] = useState('');
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);

    const [emailValue, setEmailValue] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    
    const [confirmEmailValue, setConfirmEmailValue] = useState('');
    const [isConfirmEmailInvalid, setIsConfirmEmailInvalid] = useState(false);

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [termsAgreed,setTermsAgreed] = useState(false);
    const [termsAgreedInvalid,setTermsAgreedInvalid] = useState(false);

    const handleSubmit = () => {
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

        if(emailValue !== confirmEmailValue || confirmEmailValue.length < 3) {
            setIsConfirmEmailInvalid(true);
        } else {
            setIsConfirmEmailInvalid(false);
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
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View>
        <Card size="md" variant="elevated" className="m-3">
            <VStack>
            <Heading size="md" className="mb-1">
                Create a new account
            </Heading>
            <Text size="sm">Enter your username and email address below to create a new account</Text>
            <Text size="sm"> </Text>
            <FormControl
                    isInvalid={isUsernameInvalid}
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
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
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
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
                    isInvalid={isConfirmEmailInvalid}
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
                >
                    <FormControlLabel>
                    <FormControlLabelText>Confirm Email Address</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                    <InputField
                        type='text'
                        placeholder="na@example.com"
                        value={confirmEmailValue}
                        onChangeText={(text) => {setConfirmEmailValue(text);setIsConfirmEmailInvalid(false)}}
                    />
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        Email Address doesn't match.
                    </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl
                    isInvalid={isPasswordInvalid}
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
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
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
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
                    <HStack space="md" style={{marginTop:5,flexWrap:'wrap',justifyContent:'space-between'}}>
                        <Checkbox value={'terms'} isDisabled={false} isInvalid={false} size="md" isChecked={termsAgreed} onChange={(e)=>{setTermsAgreed(e);setTermsAgreedInvalid(false)}}>
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>I agree to the</CheckboxLabel>
                            <Link href="/terms-of-service"><LinkText>Terms of Service</LinkText></Link>
                            <CheckboxLabel>and</CheckboxLabel>
                            <Link href="/privacy-policy"><LinkText>Privacy Policy</LinkText></Link>
                        </Checkbox>
                    </HStack>
                    {termsAgreedInvalid ? 
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                        <FormControlErrorText className="text-red-500">
                            You must agree to the terms of service and privacy policy.
                        </FormControlErrorText>
                    </FormControlError>
                    : null}
                </FormControl>
                <HStack space='md' style={{flexWrap:'wrap',justifyContent:'center'}}>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="solid"
                        onPress={handleSubmit}
                    >
                        <ButtonText>Submit</ButtonText>
                    </Button>
                </HStack>
                <HStack className="mt-3 items-center justify-center">
                    <Divider className="w-[100px]" />
                    <Text size="sm" style={{marginLeft:20,marginRight:20}}>OR</Text>
                    <Divider className="w-[100px]" />
                </HStack>

                <View style={{flexWrap:'wrap',justifyContent:'center'}}>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with Google')}
                    >
                        <AntDesign name="google" size={20} style={{color:Colors[colorScheme ?? 'light'].text, marginRight:5}} />
                        <ButtonText>Signup with Google</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with Facebook')}
                    >
                        <Entypo name="facebook" size={20} style={{color:Colors[colorScheme ?? 'light'].text, marginRight:5}} />
                        <ButtonText>Signup with Facebook</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Signup with X')}
                    >
                        <FontAwesome6 name="square-x-twitter" size={20} style={{color:Colors[colorScheme ?? 'light'].text, marginRight:5}} />
                        <ButtonText>Signup with X</ButtonText>
                    </Button>
                </View>
            </VStack>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loginButtons:{
    minWidth:'100%'
  }
});
