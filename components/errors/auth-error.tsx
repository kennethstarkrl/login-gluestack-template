import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useRouter } from 'expo-router';

export function AuthError() {
  const router = useRouter();
  return (
    <VStack style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
        <Text style={{color:'white'}}>You must be logged in to access this content.</Text>
        <HStack className="">
          {router.canGoBack() ? 
            <Button
                className="w-fit mt-4 m-2"
                size="sm"
                variant="outline"
                onPress={()=> router.back()}
            >
                <ButtonText>Go Back</ButtonText>
            </Button>
          :null}
          <Button
              className="w-fit mt-4 m-2"
              size="sm"
              variant="solid"
              onPress={()=> router.replace('/login')}
          >
              <ButtonText>Login</ButtonText>
          </Button>
          <Button
              className="w-fit mt-4 m-2"
              size="sm"
              variant="outline"
              onPress={()=> router.replace('/signup')}
          >
              <ButtonText>Signup</ButtonText>
          </Button>
          
        </HStack>
    </VStack>
  );
}