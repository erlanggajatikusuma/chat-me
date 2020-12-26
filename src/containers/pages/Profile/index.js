import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import picture from '../../../assets/image/hachiman.jpg';
import firebase from '../../../config/firebase/config';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const [uuid, setUuid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    const dataa = firebase.auth().currentUser;
    const uid = dataa.uid;
    const email = dataa.email;
    const name = dataa.displayName;
    const photo = dataa.photoURL;
    const phone = dataa.phoneNumber;
    setData(dataa);
    setUuid(uid);
    setEmail(email);
  };

  // const dataUser = () => {
  //   firebase.auth().currentUser()
  // }

  const addUser = async (name, email, uid, profileImg) => {
    try {
      return await firebase
        .database()
        .ref('users/' + uid)
        .set({
          name: name,
          email: email,
          uuid: uid,
          profileImg: profileImg,
        });
    } catch (error) {
      return error;
    }
  };

  // const getUser = async () => {
  //   const user = firebase.auth().currentUser;
  //   setUser(user);
  // };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
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
            Hachiman Hikigaya
          </Text>
          <Text>{email}</Text>
        </View>
      </View>
      <View style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
        <Text>Location</Text>
      </View>

      <View>
        <Button title="Try" onPress={() => console.log(data)} />
      </View>
      <View />
      <View>
        <TouchableOpacity
          onPress={() => handleSignOut()}
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
