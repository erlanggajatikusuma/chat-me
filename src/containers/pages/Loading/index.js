import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'Home' : 'Login');
      console.log('user Loading: ', user);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="pink" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8F0',
  },
});
