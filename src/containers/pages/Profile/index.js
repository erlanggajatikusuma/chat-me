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
} from 'react-native';
import picture from '../../../assets/image/hachiman.jpg';
import SettingImg from '../../../assets/icon/Settings.svg';
import firebase from '../../../config/firebase/config';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('Offline');
  const [specificData, setSpecificData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  // const getData = async () => {
  //   const uid = firebase.auth().currentUser.uid;
  //   const user = firebase.database().ref(`users/${uid}`);
  //   console.log(user);
  //   user.on('value', (snapshot) => {
  //     console.log('user snapshot:', snapshot.val());
  //     setSpecificData(snapshot.val());
  //     setName(snapshot.val() !== null ? snapshot.val().username : '');
  //     setEmail(snapshot.val() !== null ? snapshot.val().email : '');
  //     setStatus(snapshot.val() !== null ? snapshot.val().status : '');
  //     setDob(snapshot.val() !== null ? snapshot.val().dateOfBirth : '');
  //   });
  // };

  const getData = () => {
    const uid = firebase.auth().currentUser.uid;
    const user = firebase.database().ref(`users/${uid}`);
    user.on('value', (snapshot) => {
      // console.log('data snapshot: ', snapshot.val());
      if (snapshot.val() === null) {
        navigation.navigate('Edit');
      }
      setSpecificData(snapshot.val());
      setName(snapshot.val() !== null ? snapshot.val().username : '');
      setEmail(snapshot.val() !== null ? snapshot.val().email : '');
      setStatus(snapshot.val() !== null ? snapshot.val().status : '');
      setDob(snapshot.val() !== null ? snapshot.val().dateOfBirth : '');
    });
    // user.on('value', (snapshot) => {
    //   console.log('user snapshot:', snapshot.val());
    //   setSpecificData(snapshot.val());
    //   setName(snapshot.val() !== null ? snapshot.val().username : '');
    //   setEmail(snapshot.val() !== null ? snapshot.val().email : '');
    //   setStatus(snapshot.val() !== null ? snapshot.val().status : '');
    //   setDob(snapshot.val() !== null ? snapshot.val().dateOfBirth : '');
    // });
  };

  const handleSignOut = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}`).update({status: 'Offline'});
    firebase.auth().signOut();
    navigation.navigate('Login');
  };

  return (
    <View>
      <View style={{flexDirection: 'row', paddingLeft: 15}}>
        <Image
          source={picture}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            borderWidth: 1,
            borderColor: 'black',
          }}
        />
        <View
          style={{
            backgroundColor: '#12b3cc',
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {name}
            {/* Hachiman Hikigaya */}
          </Text>
          <Text>{email}</Text>
          <Text>{dob}</Text>
          <Text>{status}</Text>
        </View>
      </View>
      <View style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
        <Text>Location</Text>
      </View>
      <View>
        <SettingImg width={25} height={25} />
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
                  onPress: () => handleSignOut(),
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
            style={{textAlign: 'center', paddingVertical: 10, color: 'white'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
