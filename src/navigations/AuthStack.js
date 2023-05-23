import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import { WHITE } from '../colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
      }}
    >
      <Stack.Screen
        name={'SignIn'}
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
