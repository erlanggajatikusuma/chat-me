import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import picture from '../../../assets/image/hachiman.jpg';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

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
          <Text>hachiman@gmail.com</Text>
        </View>
      </View>
      <View style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
        <Text>Location</Text>
      </View>
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
