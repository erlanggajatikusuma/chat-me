import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';
import SplashImg from '../../../assets/image/SplashImg.png';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'Home' : 'Login');
    });
  });
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={SplashImg} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
