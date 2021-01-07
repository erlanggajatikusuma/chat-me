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
import {Button, View} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

const ChatListScreen = (props) => {
  return <Home navigation={props.navigation} />;
};
const EditScreen = () => {
  return <EditProfile />;
};
const ProfileScreen = () => {
  return <Profile />;
};

const LoadingScreen = (props) => {
  return <Loading navigation={props.navigation} />;
};
const SplashScreens = () => {
  return <SplashScreen />;
};

const RegisterScreen = (props) => {
  return <Register navigation={props.navigation} />;
};

const LoginScreen = (props) => {
  return <Login navigation={props.navigation} />;
};

const ForgotScreen = () => {
  return <ForgotPassword />;
};

const ChatScreen = (props) => {
  return <Chat navigation={props.navigation} />;
};

const ChatStack = createStackNavigator();
const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen
        name="Chatting"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </ChatStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Edit" component={EditScreen} />
    </ProfileStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const TabNavigators = () => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
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
          component={SplashScreens}
          options={{headerShown: false}}
        />
        {/* Tab Navigator */}
        <Stack.Screen
          name="Profile"
          options={{headerShown: false}}
          component={TabNavigators}
        />
        {/* ====== */}
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
