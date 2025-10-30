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
    FormControlHelper,
    FormControlLabel,
    FormControlLabelText
} from '@/components/ui/form-control';
import { HStack } from '@/components/ui/hstack';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';

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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  
  
export default function HomeScreen() {
    const [isInvalid, setIsInvalid] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [rememberPassword,setRememberPassword] = useState(false);

    const handleSubmit = () => {
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
    };
    const handleReset = () => {
        setEmailValue('');
        setPasswordValue('');
        setIsEmailInvalid(false);
        setIsPasswordInvalid(false);
    }


  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View>
        <Card size="md" variant="elevated" className="m-3">
            <VStack>
            <Heading size="md" className="mb-1">
                Login to your account
            </Heading>
            <Text size="sm">Enter your email below to login to your account</Text>
            <Text size="sm"> </Text>
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
                    <FormControlHelper>
                    </FormControlHelper>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        Username is invalid.
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
                        <Link href="/forgot-password">
                            <LinkText>Forgot your password?</LinkText>
                        </Link>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                    <InputField
                        type="password"
                        placeholder="password"
                        value={passwordValue}
                        onChangeText={(text) => {setPasswordValue(text);setIsPasswordInvalid(false)}}
                    />
                    </Input>
                    <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
                    <FormControlErrorText className="text-red-500">
                        At least 6 characters are required.
                    </FormControlErrorText>
                    </FormControlError>
                    <HStack space="md" style={{marginTop:5,flexWrap:'wrap',justifyContent:'space-between'}}>
                        <Checkbox value={'remember'} isDisabled={false} isInvalid={false} size="md" isChecked={rememberPassword} onChange={(e)=>setRememberPassword(e)}>
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>Remember me</CheckboxLabel>
                        </Checkbox>
                    </HStack>
                </FormControl>
                <HStack space='md' style={{flexWrap:'wrap',justifyContent:'center'}}>
                    {/* <Button
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={handleReset}
                    >
                        <ButtonText>Reset</ButtonText>
                    </Button> */}
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="solid"
                        onPress={handleSubmit}
                    >
                        <MaterialIcons name="login" size={20} style={{marginRight:5}} />
                        <ButtonText>Login with Email Address</ButtonText>
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
                        onPress={()=>console.log('Login with Google')}
                    >
                        <AntDesign name="google" size={20} style={{color:'white', marginRight:5}} />
                        <ButtonText>Login with Google</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Login with Facebook')}
                    >
                        <Entypo name="facebook" size={20} style={{color:'white', marginRight:5}} />
                        <ButtonText>Login with Facebook</ButtonText>
                    </Button>
                    <Button
                        style={styles.loginButtons}
                        className="w-fit self-end mt-4"
                        size="sm"
                        variant="outline"
                        onPress={()=>console.log('Login with Github')}
                    >
                        <FontAwesome6 name="square-x-twitter" size={20} style={{color:'white', marginRight:5}} />
                        <ButtonText>Login with X</ButtonText>
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
