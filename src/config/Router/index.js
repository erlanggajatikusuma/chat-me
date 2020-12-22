import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Chat, Home, Login, Profile, Register } from '../../containers/pages';
// import Home from '../../containers/pages/Home';
// import Profile from '../../containers/pages/Profile';
// import Chat from '../../containers/pages/Chat';


const HomeScreen = () => {
  return <Home />;
};

const RegisterStack = () => {
  return <Register />
}
const LoginStack = () => {
  return <Login />
}

const ProfileStack = () => {
  return <Profile />;
};

const ChatStack = () => {
  return <Chat />
}


const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterStack} />
        <Stack.Screen name="Login" component={LoginStack} />
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
