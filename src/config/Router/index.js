import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Chat,
  ForgotPassword,
  Home,
  Login,
  Main,
  Profile,
  Register,
} from '../../containers/pages';
import Loading from '../../components/atom/Loading';

const MainScreen = () => {
  return <Main />;
};

const LoadingScreen = () => {
  return <Loading />;
};

const HomeScreen = () => {
  return <Home />;
};

const RegisterStack = () => {
  return <Register />;
};

const LoginStack = () => {
  return <Login />;
};

const ForgotStack = () => {
  return <ForgotPassword />;
};

const ProfileStack = () => {
  return <Profile />;
};

const ChatStack = () => {
  return <Chat />;
};

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Register" component={RegisterStack} />
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Forgot" component={ForgotStack} />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="Chats" component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
