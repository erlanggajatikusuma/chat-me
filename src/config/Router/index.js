import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Chat,
  EditProfile,
  ForgotPassword,
  Home,
  Login,
  Profil,
  Profile,
  Register,
} from '../../containers/pages';
import SplashScreen from '../../containers/pages/Splash';

const SplashStack = () => {
  return <SplashScreen />;
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

const EditStack = () => {
  return <EditProfile />;
};

const ProfileStack = () => {
  return <Profile />;
};
const ProfilStack = () => {
  return <Profil />;
};

const ChatStack = () => {
  return <Chat />;
};

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="Splash"
          component={SplashStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen
          name="Profil"
          component={ProfilStack}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Edit" component={EditStack} />
        <Stack.Screen name="Chats" component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
