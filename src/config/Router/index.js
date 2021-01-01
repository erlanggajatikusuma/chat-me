import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Chat,
  EditProfile,
  ForgotPassword,
  Home,
  Loading,
  Login,
  Profile,
  Register,
  SplashScreen,
} from '../../containers/pages';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const HomeScreen = () => {
  return <Home />;
};
const EditStack = () => {
  return <EditProfile />;
};
const ProfileStack = () => {
  return <Profile />;
};

const LoadingStack = () => {
  return <Loading />;
};
const SplashStack = () => {
  return <SplashScreen />;
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

const ChatStack = () => {
  return <Chat />;
};

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
          component={HomeTab}
        />
        <Stack.Screen
          name="Edit"
          options={{headerShown: false}}
          component={EditStack}
        />
        <Stack.Screen name="Display" component={ProfileStack} />
        <Stack.Screen name="Chats" component={ChatStack} />
        <Stack.Screen
          name="Loading"
          component={LoadingStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
