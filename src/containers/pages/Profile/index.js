import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingImg from '../../../assets/icon/Settings.svg';
import firebase from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Loader from '../../../components/atom/Loader';

const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('uid');
    } catch (e) {
      console.log(e);
    }
    console.log('Remove uid Storage Done.');
  };

  const signOut = async () => {
    const uid = firebase().currentUser.uid;

    await database().ref(`users/${uid}`).update({status: 'Offline'});
    firebase()
      .signOut()
      .then(() => {
        removeValue();
        setName('');
        setEmail('');
        setStatus('');
        setDob('');
        setPhoto('');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      });
  };

  const getUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');

      database()
        .ref(`users/${uid}`)
        .on('value', async (dataSnapshot) => {
          const snapshot = await dataSnapshot.val();
          setName(snapshot.name);
          setEmail(snapshot.email);
          setStatus(snapshot.status);
          setDob(snapshot.dateOfBirth);
          setPhoto(snapshot.photo);
          setPhone(snapshot.phone);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader animating={loading} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Profile</Text>
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 15, paddingTop: 20}}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.imgStyle} />
            ) : (
              <View style={styles.textImg}>
                <Text style={{color: 'white'}}>{name.split(' ', 1)}</Text>
              </View>
            )}
            <View style={styles.profileWrapper}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>{name}</Text>
              <Text>{email}</Text>
              <Text>{status}</Text>
            </View>
          </View>
          <View
            style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
            <Text>{phone}</Text>
            <Text>Location</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <TouchableHighlight
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#FAF8F0',
                elevation: 4,
                borderRadius: 50,
                justifyContent: 'center',
                marginBottom: 5,
              }}
              underlayColor="white"
              activeOpacity={0.5}>
              <Icon
                name="birthday-cake"
                style={{alignSelf: 'center'}}
                size={23}
                color="pink"
              />
            </TouchableHighlight>
            <Text style={{fontSize: 16, letterSpacing: 0.5, color: 'gray'}}>
              {dob}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
              <SettingImg width={25} height={25} />
            </TouchableOpacity>
          </View>
          <View />
          <View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Logout',
                  'Are you sure ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => signOut(),
                    },
                    {
                      text: 'No',
                    },
                    ,
                  ],
                  {
                    cancelable: false,
                  },
                )
              }
              style={{
                borderWidth: 1,
                borderColor: 'lightblue',
                backgroundColor: 'blue',
                borderRadius: 9,
                marginHorizontal: 70,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 10,
                  color: 'white',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6c68ed',
    height: 50,
    justifyContent: 'center',
  },
  textHeader: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d5f7f6',
  },
  imgStyle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  textImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  profileWrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
