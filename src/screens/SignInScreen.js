import { View, StyleSheet, Image, Keyboard, Alert } from 'react-native';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  IconNames,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import Button from '../components/Button';
import { useState, useRef, useEffect, useContext } from 'react';
import { signIn } from '../api/auth';
import UserContext from '../contexts/UserContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await signIn(email, password);
        setUser(data);
      } catch (e) {
        Alert.alert('SignIn Failed', e, [
          { text: 'Ok', onPress: () => setIsLoading(false) },
        ]);
      }
    }
  };
  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Image
          source={require('../../assets/main.png')}
          style={styles.image}
          resizeMode="cover"
        />

        <Input
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          title={'email'}
          placeholder={'your@email.com'}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        ></Input>
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          title={'password'}
          secureTextEntry
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        ></Input>
        <View style={styles.buttonContainer}>
          <Button
            title={'SIGNIN'}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          ></Button>
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20,
  },
});

export default SignInScreen;
