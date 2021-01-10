import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

const Loading = ({navigation}) => {
  // const navigation = useNavigation();

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData('uid').then((res) => {
        console.log('get uid storage: ', res);
        navigation.replace(res ? 'Profile' : 'Login');
      });
    }, 100);
  }, [navigation]);

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
